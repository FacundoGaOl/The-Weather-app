// Elementos DOM
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const currentWeather = document.getElementById('currentWeather');
const forecastDays = document.getElementById('forecastDays');
const loading = document.getElementById('loading');

// Mostrar/ocultar loading
function showLoading(show) {
    loading.style.display = show ? 'block' : 'none';
}

// Obtener coordenadas de una ciudad
async function getCoordinates(city) {
    try {
        showLoading(true);
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json`
        );
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            return {
                latitude: data.results[0].latitude,
                longitude: data.results[0].longitude,
                name: data.results[0].name,
                country: data.results[0].country
            };
        } else {
            throw new Error('Ciudad no encontrada');
        }
    } catch (error) {
        throw error;
    }
}

// Obtener datos del tiempo de Open-Meteo
async function getWeatherData(latitude, longitude) {
    try {
        // Endpoint actual
        const currentUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto`;
        
        // Endpoint pronóstico 7 días
        const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`;
        
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);
        
        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();
        
        return { current: currentData, forecast: forecastData };
    } catch (error) {
        throw error;
    }
}

// Traducir códigos de tiempo de Open-Meteo
function getWeatherDescription(code) {
    const weatherCodes = {
        0: "Cielo despejado",
        1: "Mayormente despejado",
        2: "Parcialmente nublado",
        3: "Nublado",
        45: "Niebla",
        48: "Niebla con escarcha",
        51: "Llovizna ligera",
        53: "Llovizna moderada",
        55: "Llovizna densa",
        61: "Lluvia ligera",
        63: "Lluvia moderada",
        65: "Lluvia intensa",
        71: "Nieve ligera",
        73: "Nieve moderada",
        75: "Nieve intensa",
        80: "Chubascos ligeros",
        81: "Chubascos moderados",
        82: "Chubascos fuertes",
        95: "Tormenta eléctrica",
        96: "Tormenta con granizo ligero",
        99: "Tormenta con granizo fuerte"
    };
    
    return weatherCodes[code] || "Condiciones desconocidas";
}

// Obtener ícono según código
function getWeatherIcon(code) {
    if (code === 0) return '<i class="fas fa-sun"></i>';
    if (code <= 2) return '<i class="fas fa-cloud-sun"></i>';
    if (code <= 3) return '<i class="fas fa-cloud"></i>';
    if (code <= 48) return '<i class="fas fa-smog"></i>';
    if (code <= 55) return '<i class="fas fa-cloud-rain"></i>';
    if (code <= 65) return '<i class="fas fa-cloud-showers-heavy"></i>';
    if (code <= 75) return '<i class="far fa-snowflake"></i>';
    if (code <= 82) return '<i class="fas fa-cloud-sun-rain"></i>';
    if (code <= 99) return '<i class="fas fa-bolt"></i>';
    return '<i class="fas fa-question-circle"></i>';
}

// Mostrar clima actual
function displayCurrentWeather(data, cityName, country) {
    const current = data.current.current;
    
    const html = `
        <div class="weather-info">
            <div>
                <div class="weather-icon">${getWeatherIcon(current.weather_code)}</div>
                <div class="temperature">${Math.round(current.temperature_2m)}°C</div>
                <div class="weather-desc">${getWeatherDescription(current.weather_code)}</div>
                <div class="city-name">${cityName}, ${country}</div>
            </div>
            
            <div class="details">
                <div class="detail-item">
                    <i class="fas fa-temperature-low"></i>
                    <p>Sensación</p>
                    <h4>${Math.round(current.apparent_temperature)}°C</h4>
                </div>
                <div class="detail-item">
                    <i class="fas fa-tint"></i>
                    <p>Humedad</p>
                    <h4>${current.relative_humidity_2m}%</h4>
                </div>
                <div class="detail-item">
                    <i class="fas fa-wind"></i>
                    <p>Viento</p>
                    <h4>${Math.round(current.wind_speed_10m)} km/h</h4>
                </div>
                <div class="detail-item">
                    <i class="fas fa-cloud-rain"></i>
                    <p>Precipitación</p>
                    <h4>${current.precipitation} mm</h4>
                </div>
            </div>
        </div>
    `;
    
    currentWeather.innerHTML = html;
}

// Mostrar pronóstico de 7 días
function displayForecast(data) {
    const daily = data.forecast.daily;
    let html = '';
    
    // Nombres de los días
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    
    daily.time.forEach((date, index) => {
        if (index > 0) { // Saltamos hoy
            const dayDate = new Date(date);
            const dayName = days[dayDate.getDay()];
            
            html += `
                <div class="forecast-day">
                    <div class="day-name">${dayName}</div>
                    <div class="forecast-icon">${getWeatherIcon(daily.weather_code[index])}</div>
                    <div class="forecast-temp">${Math.round(daily.temperature_2m_max[index])}°</div>
                    <div class="forecast-temp-min">${Math.round(daily.temperature_2m_min[index])}°</div>
                </div>
            `;
        }
    });
    
    forecastDays.innerHTML = html;
}

// Buscar clima por ciudad
async function searchWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('Por favor, escribe el nombre de una ciudad');
        return;
    }
    
    try {
        showLoading(true);
        const coords = await getCoordinates(city);
        const weatherData = await getWeatherData(coords.latitude, coords.longitude);
        
        displayCurrentWeather(weatherData, coords.name, coords.country);
        displayForecast(weatherData);
        showLoading(false);
    } catch (error) {
        showLoading(false);
        currentWeather.innerHTML = `<div class="error"><i class="fas fa-exclamation-triangle"></i><p>Error: ${error.message}</p></div>`;
        forecastDays.innerHTML = '';
    }
}

// Obtener clima por ubicación actual
async function getLocationWeather() {
    if (!navigator.geolocation) {
        alert('Tu navegador no soporta geolocalización');
        return;
    }
    
    navigator.geolocation.getCurrentPosition(async (position) => {
        try {
            showLoading(true);
            const { latitude, longitude } = position.coords;
            
            // Obtener nombre de la ciudad desde coordenadas
            const locationResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=es`
            );
            const locationData = await locationResponse.json();
            
            const cityName = locationData.results?.[0]?.name || "Tu ubicación";
            const country = locationData.results?.[0]?.country || "";
            
            cityInput.value = cityName;
            
            const weatherData = await getWeatherData(latitude, longitude);
            
            displayCurrentWeather(weatherData, cityName, country);
            displayForecast(weatherData);
            showLoading(false);
        } catch (error) {
            showLoading(false);
            currentWeather.innerHTML = `<div class="error"><i class="fas fa-exclamation-triangle"></i><p>Error obteniendo tu ubicación</p></div>`;
            forecastDays.innerHTML = '';
        }
    }, (error) => {
        showLoading(false);
        alert('No se pudo obtener tu ubicación. Asegúrate de permitir el acceso a la ubicación.');
    });
}

// Cargar ciudad por defecto al iniciar
window.addEventListener('DOMContentLoaded', () => {
    cityInput.value = 'Madrid';
    searchWeather();
});

// Event Listeners
searchBtn.addEventListener('click', searchWeather);
locationBtn.addEventListener('click', getLocationWeather);

// Buscar al presionar Enter
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

// ====================
// SISTEMA DE FAVORITOS
// ====================

// Clave para localStorage
const FAVORITES_KEY = 'weatherAppFavorites';

// Variable para ciudad actual
let currentCityData = null;

// Obtener favoritos de localStorage
function getFavorites() {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
}

// Guardar favoritos en localStorage
function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Verificar si una ciudad ya es favorita
function isCityFavorite(cityName, country) {
    const favorites = getFavorites();
    return favorites.some(fav => 
        fav.name === cityName && fav.country === country
    );
}

// Añadir ciudad a favoritos
function addToFavorites(cityData) {
    const favorites = getFavorites();
    
    // Verificar si ya existe
    const exists = favorites.some(fav => 
        fav.name === cityData.name && fav.country === cityData.country
    );
    
    if (!exists) {
        favorites.push({
            ...cityData,
            addedAt: new Date().toISOString()
        });
        saveFavorites(favorites);
        return true;
    }
    return false;
}

// Eliminar ciudad de favoritos
function removeFromFavorites(cityName, country) {
    let favorites = getFavorites();
    const initialLength = favorites.length;
    
    favorites = favorites.filter(fav => 
        !(fav.name === cityName && fav.country === country)
    );
    
    if (favorites.length !== initialLength) {
        saveFavorites(favorites);
        return true;
    }
    return false;
}

// Actualizar temperatura de una ciudad favorita
function updateFavoriteTemperature(cityName, country, temperature) {
    const favorites = getFavorites();
    const index = favorites.findIndex(fav => 
        fav.name === cityName && fav.country === country
    );
    
    if (index !== -1) {
        favorites[index].lastTemperature = temperature;
        favorites[index].lastUpdated = new Date().toISOString();
        saveFavorites(favorites);
    }
}

// Mostrar lista de favoritos
function displayFavorites() {
    const favorites = getFavorites();
    const container = document.getElementById('favoritesContainer');
    const emptyMsg = document.getElementById('emptyFavorites');
    
    if (favorites.length === 0) {
        container.innerHTML = '';
        emptyMsg.style.display = 'block';
        return;
    }
    
    emptyMsg.style.display = 'none';
    
    // Crear HTML para cada favorito
    let html = '';
    
    favorites.forEach((fav, index) => {
        const isCurrent = currentCityData && 
                         fav.name === currentCityData.name && 
                         fav.country === currentCityData.country;
        
        html += `
            <div class="favorite-city ${isCurrent ? 'current-favorite' : ''}">
                <div class="favorite-info">
                    <div class="favorite-name">${fav.name}</div>
                    <div class="favorite-country">${fav.country}</div>
                    <div class="favorite-date">Añadido: ${new Date(fav.addedAt).toLocaleDateString('es-ES')}</div>
                </div>
                
                <div class="favorite-temp">
                    ${fav.lastTemperature ? `${fav.lastTemperature}°C` : '--°C'}
                </div>
                
                <div class="favorite-actions">
                    <button class="favorite-btn load" onclick="loadFavorite('${fav.name}', '${fav.country}')" 
                            title="Cargar esta ciudad">
                        <i class="fas fa-search"></i>
                    </button>
                    <button class="favorite-btn remove" onclick="removeFavorite('${fav.name}', '${fav.country}')" 
                            title="Eliminar de favoritos">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Actualizar temperaturas de los favoritos
    updateAllFavoritesTemperatures();
}

// Actualizar temperaturas de todas las ciudades favoritas
async function updateAllFavoritesTemperatures() {
    const favorites = getFavorites();
    
    for (const fav of favorites) {
        try {
            const coords = await getCoordinates(fav.name);
            const weatherData = await getWeatherData(coords.latitude, coords.longitude);
            const temperature = Math.round(weatherData.current.current.temperature_2m);
            
            updateFavoriteTemperature(fav.name, fav.country, temperature);
        } catch (error) {
            console.error(`Error actualizando ${fav.name}:`, error);
        }
    }
    
    // Volver a mostrar los favoritos con temperaturas actualizadas
    displayFavorites();
}

// Cargar una ciudad favorita
async function loadFavorite(cityName, country) {
    cityInput.value = cityName;
    await searchWeather();
}

// Eliminar una ciudad favorita
function removeFavorite(cityName, country) {
    if (confirm(`¿Eliminar ${cityName}, ${country} de favoritos?`)) {
        removeFromFavorites(cityName, country);
        displayFavorites();
        
        // Si es la ciudad actual, actualizar el botón
        if (currentCityData && 
            currentCityData.name === cityName && 
            currentCityData.country === country) {
            updateAddFavoriteButton();
        }
    }
}

// Crear botón para añadir a favoritos
function createAddFavoriteButton() {
    const button = document.createElement('button');
    button.className = 'add-favorite-btn';
    button.id = 'addFavoriteBtn';
    button.innerHTML = '<i class="fas fa-star"></i> Añadir a Favoritos';
    button.onclick = toggleFavorite;
    
    // Insertar después del city-name
    const cityNameElement = document.querySelector('.city-name');
    if (cityNameElement) {
        cityNameElement.parentNode.insertBefore(button, cityNameElement.nextSibling);
    }
    
    return button;
}

// Actualizar estado del botón de favoritos
function updateAddFavoriteButton() {
    const button = document.getElementById('addFavoriteBtn');
    if (!button || !currentCityData) return;
    
    const isFavorite = isCityFavorite(currentCityData.name, currentCityData.country);
    
    if (isFavorite) {
        button.innerHTML = '<i class="fas fa-check"></i> En Favoritos';
        button.classList.add('added');
    } else {
        button.innerHTML = '<i class="fas fa-star"></i> Añadir a Favoritos';
        button.classList.remove('added');
    }
}

// Alternar ciudad como favorita
async function toggleFavorite() {
    if (!currentCityData) return;
    
    const { name, country, temperature } = currentCityData;
    const isFavorite = isCityFavorite(name, country);
    
    if (isFavorite) {
        // Eliminar de favoritos
        removeFromFavorites(name, country);
        alert(`✅ ${name} eliminado de favoritos`);
    } else {
        // Añadir a favoritos
        const cityData = {
            name,
            country,
            lastTemperature: temperature,
            lastUpdated: new Date().toISOString()
        };
        
        addToFavorites(cityData);
        alert(`⭐ ${name} añadido a favoritos!`);
    }
    
    // Actualizar UI
    updateAddFavoriteButton();
    displayFavorites();
}

// ====================
// FUNCIONES MODIFICADAS
// ====================

// Modificar displayCurrentWeather para guardar ciudad actual
function displayCurrentWeather(data, cityName, country) {
    const current = data.current.current;
    const temperature = Math.round(current.temperature_2m);
    
    // Guardar datos de ciudad actual
    currentCityData = {
        name: cityName,
        country: country,
        temperature: temperature,
        data: data
    };
    
    const html = `
        <div class="weather-info">
            <div>
                <div class="current-city-header">
                    <div class="city-name">${cityName}, ${country}</div>
                    <div class="favorite-star" onclick="toggleFavorite()" 
                         title="${isCityFavorite(cityName, country) ? 'En favoritos - Click para eliminar' : 'Añadir a favoritos'}">
                        <i class="fas ${isCityFavorite(cityName, country) ? 'fa-star' : 'fa-star'}"></i>
                    </div>
                </div>
                <div class="weather-icon">${getWeatherIcon(current.weather_code)}</div>
                <div class="temperature">${temperature}°C</div>
                <div class="weather-desc">${getWeatherDescription(current.weather_code)}</div>
            </div>
            
            <div class="details">
                <div class="detail-item">
                    <i class="fas fa-temperature-low"></i>
                    <p>Sensación</p>
                    <h4>${Math.round(current.apparent_temperature)}°C</h4>
                </div>
                <div class="detail-item">
                    <i class="fas fa-tint"></i>
                    <p>Humedad</p>
                    <h4>${current.relative_humidity_2m}%</h4>
                </div>
                <div class="detail-item">
                    <i class="fas fa-wind"></i>
                    <p>Viento</p>
                    <h4>${Math.round(current.wind_speed_10m)} km/h</h4>
                </div>
                <div class="detail-item">
                    <i class="fas fa-cloud-rain"></i>
                    <p>Precipitación</p>
                    <h4>${current.precipitation} mm</h4>
                </div>
            </div>
        </div>
    `;
    
    currentWeather.innerHTML = html;
    
    // Añadir botón de favoritos si no existe
    if (!document.getElementById('addFavoriteBtn')) {
        createAddFavoriteButton();
    }
    
    // Actualizar estado del botón
    updateAddFavoriteButton();
    
    // Actualizar temperatura en favoritos si ya existe
    if (isCityFavorite(cityName, country)) {
        updateFavoriteTemperature(cityName, country, temperature);
        displayFavorites();
    }
}

// Modificar función searchWeather para actualizar favoritos
async function searchWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('Por favor, escribe el nombre de una ciudad');
        return;
    }
    
    try {
        showLoading(true);
        const coords = await getCoordinates(city);
        const weatherData = await getWeatherData(coords.latitude, coords.longitude);
        
        displayCurrentWeather(weatherData, coords.name, coords.country);
        displayForecast(weatherData);
        
        // Mostrar favoritos
        displayFavorites();
        
        showLoading(false);
    } catch (error) {
        showLoading(false);
        currentWeather.innerHTML = `<div class="error"><i class="fas fa-exclamation-triangle"></i><p>Error: ${error.message}</p></div>`;
        forecastDays.innerHTML = '';
    }
}

// Modificar función getLocationWeather para actualizar favoritos
async function getLocationWeather() {
    if (!navigator.geolocation) {
        alert('Tu navegador no soporta geolocalización');
        return;
    }
    
    navigator.geolocation.getCurrentPosition(async (position) => {
        try {
            showLoading(true);
            const { latitude, longitude } = position.coords;
            
            // Obtener nombre de la ciudad desde coordenadas
            const locationResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=es`
            );
            const locationData = await locationResponse.json();
            
            const cityName = locationData.results?.[0]?.name || "Tu ubicación";
            const country = locationData.results?.[0]?.country || "";
            
            cityInput.value = cityName;
            
            const weatherData = await getWeatherData(latitude, longitude);
            
            displayCurrentWeather(weatherData, cityName, country);
            displayForecast(weatherData);
            
            // Mostrar favoritos
            displayFavorites();
            
            showLoading(false);
        } catch (error) {
            showLoading(false);
            currentWeather.innerHTML = `<div class="error"><i class="fas fa-exclamation-triangle"></i><p>Error obteniendo tu ubicación</p></div>`;
            forecastDays.innerHTML = '';
        }
    }, (error) => {
        showLoading(false);
        alert('No se pudo obtener tu ubicación. Asegúrate de permitir el acceso a la ubicación.');
    });
}

// ====================
// INICIALIZACIÓN
// ====================

// Cargar ciudad por defecto y favoritos al iniciar
window.addEventListener('DOMContentLoaded', () => {
    cityInput.value = 'Madrid';
    searchWeather();
    
    // Mostrar favoritos inmediatamente
    displayFavorites();
});

// Actualizar favoritos cada 5 minutos
setInterval(() => {
    if (getFavorites().length > 0) {
        updateAllFavoritesTemperatures();
    }
}, 300000); // 5 minutos