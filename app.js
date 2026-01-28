// =============== CONFIGURACIÓN ===============
const API_BASE = 'https://api.open-meteo.com/v1';
const GEO_API = 'https://geocoding-api.open-meteo.com/v1';
const STORAGE_KEY = 'weatherFavorites';

// =============== CACHE DE ELEMENTOS ===============
const elements = {
    cityInput: document.getElementById('cityInput'),
    searchBtn: document.getElementById('searchBtn'),
    locationBtn: document.getElementById('locationBtn'),
    currentWeather: document.getElementById('currentWeather'),
    forecastDays: document.getElementById('forecastDays'),
    favoritesList: document.getElementById('favoritesList'),
    loading: document.getElementById('loading')
};

let currentCity = null;

// =============== UTILIDADES ===============
const showLoading = (show) => elements.loading.style.display = show ? 'block' : 'none';

const getFavorites = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
const saveFavorites = (favs) => localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));

const weatherIcons = {
    0: '☀️', 1: '⛅', 2: '⛅', 3: '☁️',
    45: '🌫️', 48: '🌫️',
    51: '🌦️', 53: '🌦️', 55: '🌦️',
    61: '🌧️', 63: '🌧️', 65: '🌧️',
    71: '🌨️', 73: '🌨️', 75: '🌨️',
    80: '🌦️', 81: '🌦️', 82: '🌦️',
    95: '⛈️', 96: '⛈️', 99: '⛈️'
};

// =============== FUNCIONES API ===============
async function getCityCoords(city) {
    const res = await fetch(`${GEO_API}/search?name=${city}&count=1&language=es`);
    const data = await res.json();
    if (!data.results?.[0]) throw new Error('Ciudad no encontrada');
    return data.results[0];
}

async function getWeather(lat, lon) {
    const url = `${API_BASE}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`;
    const res = await fetch(url);
    return await res.json();
}

// =============== RENDERIZADO ===============
function renderCurrentWeather(data, cityInfo) {
    const w = data.current;
    currentCity = { ...cityInfo, temp: Math.round(w.temperature_2m) };
    
    elements.currentWeather.innerHTML = `
        <div class="weather-info">
            <div>
                <div class="city-name">${cityInfo.name}, ${cityInfo.country}</div>
                <div class="temp-main">${Math.round(w.temperature_2m)}°C</div>
                <div>${weatherIcons[w.weather_code] || '🌀'}</div>
                <button onclick="toggleFavorite()" class="fav-btn">
                    ${isFavorite(cityInfo.name, cityInfo.country) ? '❤️ En favoritos' : '🤍 Añadir a favoritos'}
                </button>
            </div>
            <div class="details-grid">
                <div class="detail">Sensación: ${Math.round(w.apparent_temperature)}°C</div>
                <div class="detail">Humedad: ${w.relative_humidity_2m}%</div>
                <div class="detail">Viento: ${Math.round(w.wind_speed_10m)} km/h</div>
                <div class="detail">Lluvia: ${w.precipitation} mm</div>
            </div>
        </div>
    `;
}

function renderForecast(data) {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    let html = '';
    
    data.daily.time.forEach((date, i) => {
        if (i > 0 && i < 6) { // Mostrar próximos 5 días (no hoy)
            const dayName = days[new Date(date).getDay()];
            html += `
                <div class="forecast-day">
                    <div><strong>${dayName}</strong></div>
                    <div>${weatherIcons[data.daily.weather_code[i]] || '🌀'}</div>
                    <div>${Math.round(data.daily.temperature_2m_max[i])}°</div>
                    <small>${Math.round(data.daily.temperature_2m_min[i])}°</small>
                </div>
            `;
        }
    });
    
    elements.forecastDays.innerHTML = html;
}

// =============== FAVORITOS ===============
function isFavorite(name, country) {
    return getFavorites().some(f => f.name === name && f.country === country);
}

function toggleFavorite() {
    if (!currentCity) return;
    
    const favs = getFavorites();
    const exists = favs.findIndex(f => 
        f.name === currentCity.name && f.country === currentCity.country);
    
    if (exists > -1) {
        favs.splice(exists, 1);
        alert(`❌ ${currentCity.name} eliminado de favoritos`);
    } else {
        favs.push({
            ...currentCity,
            added: new Date().toISOString()
        });
        alert(`⭐ ${currentCity.name} añadido a favoritos!`);
    }
    
    saveFavorites(favs);
    renderFavorites();
    renderCurrentWeather({ current: currentCity }, currentCity); // Actualizar botón
}

function renderFavorites() {
    const favs = getFavorites();
    
    if (favs.length === 0) {
        elements.favoritesList.innerHTML = '<p style="color:#666">No hay ciudades favoritas</p>';
        return;
    }
    
    elements.favoritesList.innerHTML = favs.map(fav => `
        <div class="favorite-item">
            <div>
                <strong>${fav.name}</strong><br>
                <small>${fav.country} • ${fav.temp}°C</small>
            </div>
            <div>
                <button onclick="loadCity('${fav.name}')" title="Cargar">🔍</button>
                <button onclick="removeFavorite('${fav.name}', '${fav.country}')" title="Eliminar">🗑️</button>
            </div>
        </div>
    `).join('');
}

function loadCity(cityName) {
    elements.cityInput.value = cityName;
    searchWeather();
}

function removeFavorite(name, country) {
    if (!confirm(`¿Eliminar ${name} de favoritos?`)) return;
    
    const favs = getFavorites().filter(f => 
        !(f.name === name && f.country === country));
    
    saveFavorites(favs);
    renderFavorites();
}

// =============== FUNCIONES PRINCIPALES ===============
async function searchWeather() {
    const city = elements.cityInput.value.trim();
    if (!city) return alert('Escribe una ciudad');
    
    try {
        showLoading(true);
        const cityInfo = await getCityCoords(city);
        const weatherData = await getWeather(cityInfo.latitude, cityInfo.longitude);
        
        renderCurrentWeather(weatherData, cityInfo);
        renderForecast(weatherData);
        showLoading(false);
    } catch (err) {
        showLoading(false);
        elements.currentWeather.innerHTML = `<div style="color:#ef4444; text-align:center; padding:20px;">Error: ${err.message}</div>`;
    }
}

function getLocationWeather() {
    if (!navigator.geolocation) return alert('Tu navegador no soporta geolocalización');
    
    navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
            showLoading(true);
            const { latitude, longitude } = pos.coords;
            
            // Obtener nombre de la ubicación
            const res = await fetch(`${GEO_API}/reverse?latitude=${latitude}&longitude=${longitude}&language=es`);
            const data = await res.json();
            const cityInfo = data.results?.[0] || { name: 'Tu ubicación', country: '' };
            
            elements.cityInput.value = cityInfo.name;
            const weatherData = await getWeather(latitude, longitude);
            
            renderCurrentWeather(weatherData, cityInfo);
            renderForecast(weatherData);
            showLoading(false);
        } catch (err) {
            showLoading(false);
            alert('Error obteniendo tu ubicación');
        }
    }, () => alert('Permiso de ubicación denegado'));
}

// =============== INICIALIZACIÓN ===============
elements.searchBtn.addEventListener('click', searchWeather);
elements.locationBtn.addEventListener('click', getLocationWeather);
elements.cityInput.addEventListener('keypress', e => e.key === 'Enter' && searchWeather());

window.addEventListener('DOMContentLoaded', () => {
    searchWeather();
    renderFavorites();
});

setInterval(() => {
    if (getFavorites().length > 0) renderFavorites();
}, 600000);