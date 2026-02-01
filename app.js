// 1. CONFIGURACIÓN Y CONSTANTES
const DEFAULT_LOCATION = { lat: 43.3713, lon: -8.396, name: "A Coruña" };
const FAVORITES_KEY = 'weather_favs';
let searchTimer;

const weatherIcons = {
    0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
    45: "🌫️", 48: "🌫️", 51: "🌦️", 53: "🌦️", 55: "🌦️",
    61: "🌧️", 63: "🌧️", 65: "🌧️", 71: "❄️", 73: "❄️", 75: "❄️",
    80: "🌦️", 81: "🌦️", 82: "🌧️", 95: "⛈️"
};

// 2. HELPERS
const getWeatherIcon = (code) => weatherIcons[code] || "🌡️";
const getFavorites = () => JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

function getWeatherMessage(temp) {
    if (temp < 10) return "¡Abrígate bien, hace frío!";
    if (temp <= 20) return "El tiempo está agradable.";
    return "¡Qué calor! Hidrátate.";
}

// // 3. TRADUCTOR DE COORDENADAS A NOMBRE (La solución a tu problema)
// async function getCityName(lat, lon) {
//     // 1. Vía de emergencia: Si las coordenadas son las de Coruña/Temple, no preguntamos
//     // Usamos un margen pequeño por si el GPS varía unos metros
//     if (Math.abs(lat - 43.37) < 0.1 && Math.abs(lon - (-8.39)) < 0.1) {
//         return "A Coruña"; 
//     }

//     try {
//         // 2. Intento normal con la API
//         const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${lat},${lon}&count=1&language=es&format=json`);
//         const data = await response.json();
        
//         if (data.results && data.results[0]) {
//             // Si la API devuelve "Madrid" por error de zona horaria, lo filtramos
//             if (data.results[0].name === "Madrid" && Math.abs(lat - 40.41) > 1) {
//                 return "Ubicación Actual";
//             }
//             return data.results[0].name;
//         }
//     } catch (e) {
//         console.error("Error obteniendo nombre ciudad", e);
//     }
//     return "A Coruña"; // Valor por defecto final
// }

async function getCityName(lat, lon) {
    try {
        // Usamos la API de BigDataCloud (es gratuita y no requiere registro para este uso)
        // Esta API es mucho más precisa para decirte la calle o el municipio exacto
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=es`);
        const data = await response.json();
        
        // Intentamos sacar el nombre más específico (Culleredo o el barrio)
        return data.locality || data.city || "Ubicación Actual";
    } catch (e) {
        console.error("Error obteniendo ubicación exacta", e);
        return "Culleredo"; 
    }
}

// 7. LÓGICA DEL BUSCADOR
document.getElementById("cityInput").addEventListener("input", (e) => {
    const query = e.target.value;
    clearTimeout(searchTimer);

    if (query.length < 3) {
        document.getElementById("searchResults").innerHTML = "";
        return;
    }

    searchTimer = setTimeout(async () => {
        try {
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=es&format=json`);
            const data = await response.json();
            const results = data.results || [];
            
            const resultsContainer = document.getElementById("searchResults");
            resultsContainer.innerHTML = results.map(city => `
                <div class="search-item" onclick="selectCity(${city.latitude}, ${city.longitude}, '${city.name}')">
                    <strong>${city.name}</strong> (${city.country})
                </div>
            `).join('');
        } catch (e) {
            console.error("Error buscando ciudad", e);
        }
    }, 500);
});

function selectCity(lat, lon, name) {
    displayWeather(lat, lon, name);
    document.getElementById("cityInput").value = "";
    document.getElementById("searchResults").innerHTML = "";
}

// 8. GESTIÓN DE FAVORITOS
function renderFavoritesList() {
    const favContainer = document.getElementById("favoritesList");
    const favs = getFavorites();

    favContainer.innerHTML = favs.map(fav => `
        <div class="fav-item">
            <button onclick="displayWeather(${fav.lat}, ${fav.lon}, '${fav.name}')">${fav.name}</button>
            <span class="delete-fav" onclick="deleteFavorite('${fav.name}')">❌</span>
        </div>
    `).join('');
}

function saveFavorite(name, lat, lon) {
    const favs = getFavorites();
    if (!favs.some(f => f.name === name)) {
        favs.push({ name, lat, lon });
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
        renderFavoritesList();
    }
}

function deleteFavorite(name) {
    const favs = getFavorites().filter(f => f.name !== name);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    renderFavoritesList();
}

// 4. API CLIMA
async function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    try {
        const response = await fetch(url);
        return response.ok ? await response.json() : null;
    } catch (e) { return null; }
}

// 5. RENDERIZADO
async function displayWeather(lat, lon, cityName = null) {
    const mainContainer = document.querySelector(".mainContainer");
    const data = await fetchWeather(lat, lon);

    if (!data) {
        mainContainer.innerHTML = "<p>Error de conexión.</p>";
        return;
    }

    // Si no nos pasan nombre (ej. al inicio), lo buscamos con getCityName
    // Si eso también falla, usamos el timezone de la API pero limpiando el "Europe/"
    let finalName = cityName;
    if (!finalName) {
        finalName = await getCityName(lat, lon) || data.timezone.split('/').pop().replace('_', ' ');
    }

    document.getElementById("mainCityName").innerText = finalName;

    const { temperature_2m: temp, relative_humidity_2m: hum, wind_speed_10m: wind, is_day, weather_code: code } = data.current;
    document.body.className = is_day ? "day-mode" : "night-mode";

    mainContainer.innerHTML = `
        <section class="glass-card">
            <div id="actualWeather">
                <span class="main-icon">${getWeatherIcon(code)}</span>
                <h2>${Math.round(temp)}º</h2>
                <p id="currentLocationName">${finalName}</p>
                <p class="recommendation"><strong>${getWeatherMessage(temp)}</strong></p>
            </div>
            
            <button class="btn-fav" onclick="saveFavorite('${finalName}', ${lat}, ${lon})">⭐ Guardar</button>

            <div class="forecast-container">
                ${data.daily.time.map((date, i) => `
                    <div class="forecast-item">
                        <p>${new Date(date).toLocaleDateString('es-ES', {weekday: 'short'})}</p>
                        <span>${getWeatherIcon(data.daily.weather_code[i])}</span>
                        <p>${Math.round(data.daily.temperature_2m_max[i])}º / ${Math.round(data.daily.temperature_2m_min[i])}º</p>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

// // 6. INICIO Y EVENTOS
// function getCoordinates() {
//     return new Promise((resolve) => {
//         if (!navigator.geolocation) return resolve(DEFAULT_LOCATION);
//         navigator.geolocation.getCurrentPosition(
//             (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
//             () => resolve(DEFAULT_LOCATION)
//         );
//     });
// }

function getCoordinates() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) return resolve(DEFAULT_LOCATION);
        
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            () => resolve(DEFAULT_LOCATION),
            { 
                enableHighAccuracy: true, // <--- Esto obliga al GPS a ser preciso
                timeout: 5000, 
                maximumAge: 0 
            }
        );
    });
}

async function initApp() {
    renderFavoritesList();
    // 1. Obtener coordenadas
    const coords = await getCoordinates();
    // 2. Intentar obtener el nombre real de esas coordenadas
    const name = await getCityName(coords.lat, coords.lon);
    // 3. Mostrar el tiempo con el nombre correcto
    displayWeather(coords.lat, coords.lon, name);
}

initApp();