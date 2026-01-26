// ==================== SISTEMA DE CACHÉ AVANZADO ====================

class CacheAvanzado {
    constructor(opciones = {}) {
        this.cacheMemoria = new Map();
        this.prefijo = opciones.prefijo || 'weather_';
        this.tiempoExpiracion = opciones.tiempoExpiracion || 30 * 60 * 1000;
        this.maxEntradasMemoria = opciones.maxEntradasMemoria || 1000;
        this.usarLocalStorage = opciones.usarLocalStorage !== false;
        
        // Estadísticas
        this.hits = 0;
        this.misses = 0;
        
        // Limpiar expirados al iniciar
        if (this.usarLocalStorage) {
            this.limpiarExpirados();
        }
    }
    
    generarClave(lat, lon, variable, precision = 2) {
        const latRedondeada = Math.round(lat * Math.pow(10, precision)) / Math.pow(10, precision);
        const lonRedondeada = Math.round(lon * Math.pow(10, precision)) / Math.pow(10, precision);
        return `${latRedondeada},${lonRedondeada},${variable}`;
    }
    
    generarClaveLS(clave) {
        return `${this.prefijo}${clave}`;
    }
    
    obtenerMemoria(clave) {
        const entrada = this.cacheMemoria.get(clave);
        if (!entrada) return null;
        
        if (Date.now() - entrada.timestamp > this.tiempoExpiracion) {
            this.cacheMemoria.delete(clave);
            return null;
        }
        
        entrada.ultimoAcceso = Date.now();
        return entrada.valor;
    }
    
    obtenerLocalStorage(clave) {
        if (!this.usarLocalStorage) return null;
        
        try {
            const claveLS = this.generarClaveLS(clave);
            const item = localStorage.getItem(claveLS);
            if (!item) return null;
            
            const datos = JSON.parse(item);
            
            if (Date.now() - datos.timestamp > this.tiempoExpiracion) {
                localStorage.removeItem(claveLS);
                return null;
            }
            
            return datos.valor;
        } catch (error) {
            return null;
        }
    }
    
    obtener(lat, lon, variable) {
        const clave = this.generarClave(lat, lon, variable);
        
        let valor = this.obtenerMemoria(clave);
        if (valor !== null) {
            this.hits++;
            return valor;
        }
        
        valor = this.obtenerLocalStorage(clave);
        if (valor !== null) {
            this.hits++;
            this.guardarMemoria(clave, valor);
            return valor;
        }
        
        this.misses++;
        return null;
    }
    
    guardarMemoria(clave, valor) {
        if (this.cacheMemoria.size >= this.maxEntradasMemoria) {
            let claveMinima = null;
            let tiempoMinimo = Infinity;
            
            for (const [k, v] of this.cacheMemoria.entries()) {
                if (v.ultimoAcceso < tiempoMinimo) {
                    tiempoMinimo = v.ultimoAcceso;
                    claveMinima = k;
                }
            }
            
            if (claveMinima) {
                this.cacheMemoria.delete(claveMinima);
            }
        }
        
        this.cacheMemoria.set(clave, {
            valor: valor,
            timestamp: Date.now(),
            ultimoAcceso: Date.now()
        });
    }
    
    guardarLocalStorage(clave, valor) {
        if (!this.usarLocalStorage) return;
        
        try {
            const claveLS = this.generarClaveLS(clave);
            const datos = {
                valor: valor,
                timestamp: Date.now()
            };
            localStorage.setItem(claveLS, JSON.stringify(datos));
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                this.limpiarLocalStorageAntiguo();
            }
        }
    }
    
    guardar(lat, lon, variable, valor) {
        const clave = this.generarClave(lat, lon, variable);
        this.guardarMemoria(clave, valor);
        this.guardarLocalStorage(clave, valor);
    }
    
    limpiarExpirados() {
        const ahora = Date.now();
        
        for (const [clave, entrada] of this.cacheMemoria.entries()) {
            if (ahora - entrada.timestamp > this.tiempoExpiracion) {
                this.cacheMemoria.delete(clave);
            }
        }
        
        if (this.usarLocalStorage) {
            Object.keys(localStorage).forEach(clave => {
                if (clave.startsWith(this.prefijo)) {
                    try {
                        const item = localStorage.getItem(clave);
                        const datos = JSON.parse(item);
                        if (ahora - datos.timestamp > this.tiempoExpiracion) {
                            localStorage.removeItem(clave);
                        }
                    } catch (error) {
                        localStorage.removeItem(clave);
                    }
                }
            });
        }
    }
    
    limpiarLocalStorageAntiguo() {
        const items = [];
        Object.keys(localStorage).forEach(clave => {
            if (clave.startsWith(this.prefijo)) {
                try {
                    const item = localStorage.getItem(clave);
                    const datos = JSON.parse(item);
                    items.push({ clave, timestamp: datos.timestamp });
                } catch (error) {
                    localStorage.removeItem(clave);
                }
            }
        });
        
        items.sort((a, b) => a.timestamp - b.timestamp);
        const eliminar = Math.ceil(items.length * 0.3);
        
        for (let i = 0; i < eliminar; i++) {
            localStorage.removeItem(items[i].clave);
        }
    }
    
    limpiarTodo() {
        this.cacheMemoria.clear();
        
        if (this.usarLocalStorage) {
            Object.keys(localStorage).forEach(clave => {
                if (clave.startsWith(this.prefijo)) {
                    localStorage.removeItem(clave);
                }
            });
        }
        
        this.hits = 0;
        this.misses = 0;
    }
    
    async obtenerConCache(lat, lon, variable) {
        const valorCache = this.obtener(lat, lon, variable);
        
        if (valorCache !== null) {
            return valorCache;
        }
        
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=${variable}`
            );
            const data = await response.json();
            const valor = data.current[variable];
            
            this.guardar(lat, lon, variable, valor);
            
            return valor;
        } catch (error) {
            console.error('Error consultando API:', error);
            return null;
        }
    }
    
    estadisticas() {
        const total = this.hits + this.misses;
        const hitRate = total > 0 ? ((this.hits / total) * 100).toFixed(2) : 0;
        
        let tamañoLS = 0;
        let entradasLS = 0;
        
        if (this.usarLocalStorage) {
            Object.keys(localStorage).forEach(clave => {
                if (clave.startsWith(this.prefijo)) {
                    entradasLS++;
                    tamañoLS += localStorage.getItem(clave).length;
                }
            });
        }
        
        return {
            hits: this.hits,
            misses: this.misses,
            hitRate: `${hitRate}%`,
            entradasMemoria: this.cacheMemoria.size,
            entradasLocalStorage: entradasLS,
            tamañoLocalStorage: `${(tamañoLS / 1024).toFixed(2)} KB`
        };
    }
}

// ==================== VARIABLES GLOBALES ====================

const cacheClima = new CacheAvanzado({
    prefijo: 'weather_app_',
    tiempoExpiracion: 30 * 60 * 1000,
    maxEntradasMemoria: 500,
    usarLocalStorage: true
});

let currentLocation = null;
let savedLocations = [];
let selectedLocationIndex = null;

// Elementos del DOM
const loading = document.getElementById('loading');
const weatherDisplay = document.getElementById('weather-display');
const cityName = document.getElementById('city-name');
const currentDate = document.getElementById('current-date');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const precipitation = document.getElementById('precipitation');
const historyChart = document.getElementById('history-chart');
const forecastContainer = document.getElementById('forecast-container');
const currentLocationCard = document.getElementById('current-location');
const savedLocationsContainer = document.getElementById('saved-locations');
const modal = document.getElementById('modal');
const btnAddLocation = document.getElementById('btn-add-location');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnSearchLocation = document.getElementById('btn-search-location');
const btnClearCache = document.getElementById('btn-clear-cache');
const inputLocation = document.getElementById('input-location');
const searchResults = document.getElementById('search-results');
const hitRate = document.getElementById('hit-rate');
const cacheEntries = document.getElementById('cache-entries');
const cacheSize = document.getElementById('cache-size');

// ==================== INICIALIZACIÓN ====================

function init() {
    loadSavedLocations();
    getCurrentLocation();
    setupEventListeners();
    updateCacheStats();
    
    // Actualizar estadísticas cada 10 segundos
    setInterval(updateCacheStats, 10000);
    
    // Limpiar caché expirado cada 10 minutos
    setInterval(() => cacheClima.limpiarExpirados(), 10 * 60 * 1000);
}

function setupEventListeners() {
    btnAddLocation.addEventListener('click', openModal);
    btnCloseModal.addEventListener('click', closeModal);
    btnSearchLocation.addEventListener('click', searchLocation);
    btnClearCache.addEventListener('click', clearCache);
    inputLocation.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchLocation();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// ==================== GEOLOCALIZACIÓN ====================

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                const cityData = await getCityName(lat, lon);
                
                currentLocation = {
                    name: cityData.name,
                    lat: lat,
                    lon: lon,
                    isCurrentLocation: true
                };
                
                updateCurrentLocationCard();
                displayWeather(currentLocation);
            },
            (error) => {
                console.error('Error obteniendo ubicación:', error);
                alert('No se pudo obtener tu ubicación. Por favor, permite el acceso a la ubicación.');
            }
        );
    } else {
        alert('Tu navegador no soporta geolocalización.');
    }
}

async function getCityName(lat, lon) {
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&count=1`
        );
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            return {
                name: data.results[0].name || 'Ubicación desconocida',
                country: data.results[0].country || ''
            };
        }
        return { name: 'Ubicación desconocida', country: '' };
    } catch (error) {
        console.error('Error en geocoding inverso:', error);
        return { name: 'Ubicación desconocida', country: '' };
    }
}

// ==================== MOSTRAR DATOS DEL TIEMPO ====================

async function displayWeather(location) {
    try {
        loading.style.display = 'flex';
        weatherDisplay.classList.add('hidden');
        
        // Obtener datos actuales y pronóstico
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&past_days=7&forecast_days=3&timezone=auto`
        );
        
        const data = await response.json();
        const current = data.current;
        
        // Actualizar datos actuales
        cityName.textContent = location.name;
        currentDate.textContent = formatDate(new Date());
        temperature.textContent = `${Math.round(current.temperature_2m)}°C`;
        description.textContent = getWeatherDescription(current.weather_code);
        feelsLike.textContent = `${Math.round(current.apparent_temperature)}°C`;
        humidity.textContent = `${current.relative_humidity_2m}%`;
        wind.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
        precipitation.textContent = `${current.precipitation} mm`;
        
        // Actualizar historial
        displayHistory(data.daily);
        
        // Actualizar pronóstico
        displayForecast(data.daily);
        
        loading.style.display = 'none';
        weatherDisplay.classList.remove('hidden');
        
        // Actualizar estadísticas del caché
        updateCacheStats();
        
    } catch (error) {
        console.error('Error obteniendo datos del tiempo:', error);
        alert('Error al obtener los datos del tiempo');
        loading.style.display = 'none';
    }
}

// ==================== HISTORIAL (ÚLTIMOS 7 DÍAS) ====================

function displayHistory(dailyData) {
    historyChart.innerHTML = '';
    
    // Obtener solo los últimos 7 días (excluyendo el día actual y futuros)
    const totalDias = dailyData.time.length;
    const diasHistorico = 7;
    const indiceInicio = Math.max(0, totalDias - diasHistorico - 3); // -3 para excluir los 3 días de pronóstico
    const indiceFin = totalDias - 3;
    
    const temperaturas = [];
    
    for (let i = indiceInicio; i < indiceFin; i++) {
        const temp = (dailyData.temperature_2m_max[i] + dailyData.temperature_2m_min[i]) / 2;
        temperaturas.push(temp);
    }
    
    const maxTemp = Math.max(...temperaturas);
    const minTemp = Math.min(...temperaturas);
    const rangoTemp = maxTemp - minTemp || 1;
    
    for (let i = indiceInicio; i < indiceFin; i++) {
        const fecha = new Date(dailyData.time[i]);
        const tempMax = dailyData.temperature_2m_max[i];
        const tempMin = dailyData.temperature_2m_min[i];
        const tempMedia = (tempMax + tempMin) / 2;
        
        const altura = ((tempMedia - minTemp) / rangoTemp) * 100;
        
        const bar = document.createElement('div');
        bar.className = 'history-bar';
        bar.style.height = `${Math.max(altura, 10)}%`;
        
        const label = document.createElement('div');
        label.className = 'history-bar-label';
        label.textContent = formatShortDate(fecha);
        
        const value = document.createElement('div');
        value.className = 'history-bar-value';
        value.textContent = `${Math.round(tempMedia)}°`;
        
        bar.appendChild(value);
        bar.appendChild(label);
        
        bar.title = `${formatShortDate(fecha)}: ${Math.round(tempMax)}° / ${Math.round(tempMin)}°`;
        
        historyChart.appendChild(bar);
    }
}

// ==================== PRONÓSTICO (PRÓXIMOS 3 DÍAS) ====================

function displayForecast(dailyData) {
    forecastContainer.innerHTML = '';
    
    // Obtener los próximos 3 días (últimos 3 elementos del array)
    const totalDias = dailyData.time.length;
    const indiceInicio = totalDias - 3;
    
    for (let i = indiceInicio; i < totalDias; i++) {
        const fecha = new Date(dailyData.time[i]);
        const tempMax = dailyData.temperature_2m_max[i];
        const tempMin = dailyData.temperature_2m_min[i];
        const weatherCode = dailyData.weather_code[i];
        const precipSum = dailyData.precipitation_sum[i];
        const precipProb = dailyData.precipitation_probability_max[i];
        const windMax = dailyData.wind_speed_10m_max[i];
        
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        card.innerHTML = `
            <div class="forecast-day">${getDayName(fecha)}</div>
            <div class="forecast-date">${formatShortDate(fecha)}</div>
            <div class="forecast-icon">${getWeatherIcon(weatherCode)}</div>
            <div class="forecast-temps">
                <div class="forecast-temp">
                    <div class="forecast-temp-label">Máx</div>
                    <div class="forecast-temp-value max">${Math.round(tempMax)}°</div>
                </div>
                <div class="forecast-temp">
                    <div class="forecast-temp-label">Mín</div>
                    <div class="forecast-temp-value min">${Math.round(tempMin)}°</div>
                </div>
            </div>
            <div class="forecast-description">${getWeatherDescription(weatherCode)}</div>
            <div class="forecast-details">
                <div class="forecast-detail">
                    <div class="forecast-detail-label">Lluvia</div>
                    <div class="forecast-detail-value">${precipProb}%</div>
                </div>
                <div class="forecast-detail">
                    <div class="forecast-detail-label">Viento</div>
                    <div class="forecast-detail-value">${Math.round(windMax)} km/h</div>
                </div>
            </div>
        `;
        
        forecastContainer.appendChild(card);
    }
}

// ==================== FUNCIONES AUXILIARES ====================

function getWeatherDescription(code) {
    const weatherCodes = {
        0: 'Despejado',
        1: 'Mayormente despejado',
        2: 'Parcialmente nublado',
        3: 'Nublado',
        45: 'Niebla',
        48: 'Niebla con escarcha',
        51: 'Llovizna ligera',
        53: 'Llovizna moderada',
        55: 'Llovizna densa',
        61: 'Lluvia ligera',
        63: 'Lluvia moderada',
        65: 'Lluvia intensa',
        71: 'Nieve ligera',
        73: 'Nieve moderada',
        75: 'Nieve intensa',
        77: 'Granizo',
        80: 'Chubascos ligeros',
        81: 'Chubascos moderados',
        82: 'Chubascos violentos',
        85: 'Nevadas ligeras',
        86: 'Nevadas intensas',
        95: 'Tormenta',
        96: 'Tormenta con granizo ligero',
        99: 'Tormenta con granizo intenso'
    };
    
    return weatherCodes[code] || 'Desconocido';
}

function getWeatherIcon(code) {
    const icons = {
        0: '☀️',
        1: '🌤️',
        2: '⛅',
        3: '☁️',
        45: '🌫️',
        48: '🌫️',
        51: '🌦️',
        53: '🌦️',
        55: '🌧️',
        61: '🌧️',
        63: '🌧️',
        65: '⛈️',
        71: '🌨️',
        73: '🌨️',
        75: '❄️',
        77: '🌨️',
        80: '🌦️',
        81: '🌧️',
        82: '⛈️',
        85: '🌨️',
        86: '❄️',
        95: '⛈️',
        96: '⛈️',
        99: '⛈️'
    };
    
    return icons[code] || '🌡️';
}

function formatDate(date) {
    const opciones = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', opciones);
}

function formatShortDate(date) {
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    return `${dia}/${mes}`;
}

function getDayName(date) {
    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return dias[date.getDay()];
}

// ==================== GESTIÓN DE UBICACIONES ====================

function updateCurrentLocationCard() {
    if (currentLocation) {
        currentLocationCard.innerHTML = `
            <p class="location-name">${currentLocation.name}</p>
        `;
        currentLocationCard.addEventListener('click', () => {
            displayWeather(currentLocation);
            updateActiveLocation(null);
        });
    }
}

async function searchLocation() {
    const query = inputLocation.value.trim();
    
    if (!query) {
        alert('Por favor, ingresa el nombre de una ciudad');
        return;
    }
    
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=es`
        );
        
        const data = await response.json();
        
        if (!data.results || data.results.length === 0) {
            alert('No se encontraron resultados');
            return;
        }
        
        displaySearchResults(data.results);
        
    } catch (error) {
        console.error('Error buscando ubicación:', error);
        alert('Error al buscar la ubicación');
    }
}

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    searchResults.classList.remove('hidden');
    
    results.forEach(result => {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        div.innerHTML = `
            <strong>${result.name}</strong><br>
            <small>${result.admin1 || ''}, ${result.country}</small>
        `;
        
        div.addEventListener('click', () => {
            addLocation({
                name: `${result.name}, ${result.country}`,
                lat: result.latitude,
                lon: result.longitude
            });
            closeModal();
        });
        
        searchResults.appendChild(div);
    });
}

function addLocation(location) {
    const exists = savedLocations.some(
        loc => loc.lat === location.lat && loc.lon === location.lon
    );
    
    if (exists) {
        alert('Esta ubicación ya está guardada');
        return;
    }
    
    savedLocations.push(location);
    saveSavedLocations();
    renderSavedLocations();
}

function renderSavedLocations() {
    savedLocationsContainer.innerHTML = '';
    
    savedLocations.forEach((location, index) => {
        const div = document.createElement('div');
        div.className = 'saved-location-item';
        if (selectedLocationIndex === index) {
            div.classList.add('active');
        }
        
        div.innerHTML = `
            <div>
                <p class="location-name">${location.name}</p>
            </div>
            <button class="btn-delete" data-index="${index}">Eliminar</button>
        `;
        
        div.addEventListener('click', (e) => {
            if (!e.target.classList.contains('btn-delete')) {
                displayWeather(location);
                updateActiveLocation(index);
            }
        });
        
        const btnDelete = div.querySelector('.btn-delete');
        btnDelete.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteLocation(index);
        });
        
        savedLocationsContainer.appendChild(div);
    });
}

function updateActiveLocation(index) {
    selectedLocationIndex = index;
    renderSavedLocations();
    
    if (index === null) {
        currentLocationCard.classList.add('active');
    } else {
        currentLocationCard.classList.remove('active');
    }
}

function deleteLocation(index) {
    if (confirm('¿Estás seguro de eliminar esta ubicación?')) {
        savedLocations.splice(index, 1);
        saveSavedLocations();
        renderSavedLocations();
        
        if (selectedLocationIndex === index) {
            displayWeather(currentLocation);
            updateActiveLocation(null);
        }
    }
}

function saveSavedLocations() {
    localStorage.setItem('weatherAppLocations', JSON.stringify(savedLocations));
}

function loadSavedLocations() {
    const stored = localStorage.getItem('weatherAppLocations');
    if (stored) {
        savedLocations = JSON.parse(stored);
        renderSavedLocations();
    }
}

// ==================== MODAL ====================

function openModal() {
    modal.classList.remove('hidden');
    inputLocation.value = '';
    searchResults.classList.add('hidden');
    searchResults.innerHTML = '';
}

function closeModal() {
    modal.classList.add('hidden');
}

// ==================== GESTIÓN DEL CACHÉ ====================

function updateCacheStats() {
    const stats = cacheClima.estadisticas();
    
    hitRate.textContent = stats.hitRate;
    cacheEntries.textContent = stats.entradasMemoria + stats.entradasLocalStorage;
    cacheSize.textContent = stats.tamañoLocalStorage;
}

function clearCache() {
    if (confirm('¿Estás seguro de limpiar todo el caché? Esto eliminará todos los datos guardados.')) {
        cacheClima.limpiarTodo();
        updateCacheStats();
        alert('Caché limpiado exitosamente');
    }
}

// ==================== INICIAR APLICACIÓN ====================

document.addEventListener('DOMContentLoaded', init);