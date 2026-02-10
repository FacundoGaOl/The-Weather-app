const defaultLocation = { lat: 43.3713, lon: -8.396, name: "A Coruña" };
const favoritesKey = 'weatherFavs';
let searchTimer;

const weatherIcons = {
    0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
    45: "🌫️", 48: "🌫️", 51: "🌦️", 53: "🌦️", 55: "🌦️",
    61: "🌧️", 63: "🌧️", 65: "🌧️", 71: "❄️", 73: "❄️", 75: "❄️",
    80: "🌦️", 81: "🌦️", 82: "🌧️", 95: "⛈️"
};

const getWeatherIcon = (code) => weatherIcons[code] || "🌡️";
const getFavorites = () => JSON.parse(localStorage.getItem(favoritesKey)) || [];

const cityOverrides = {
    "Muy Fiel y Reconquistadora Ciudad de San Felipe y Santiago de Montevideo": "Montevideo",
};

const sanitizeCityName = (name) => cityOverrides[name] || name;

window.selectCity = function(lat, lon, name) {
    displayWeather(lat, lon, name);
    document.getElementById("cityInput").value = "";
    document.getElementById("searchResults").innerHTML = "";
};

window.deleteFavorite = function(name) {
    const favs = getFavorites().filter(favorite => favorite.name !== name);
    localStorage.setItem(favoritesKey, JSON.stringify(favs));
    renderFavoritesList();
};

window.saveFavorite = function(name, lat, lon) {
    const favs = getFavorites();
    if (!favs.some(favorite => favorite.name === name)) {
        favs.push({ name, lat, lon });
        localStorage.setItem(favoritesKey, JSON.stringify(favs));
        renderFavoritesList();
    }
};

window.displayWeather = displayWeather;

function getWeatherMessage(temp) {
    if (temp < 10) return "¡Abrígate bien, hace frío!";
    if (temp <= 20) return "El tiempo está agradable.";
    return "¡Qué calor! Hidrátate.";
}

async function getCityName(lat, lon) {
    try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=es`);
        const data = await response.json();

        return data.locality || data.city || "Ubicación Actual";
    } catch (error) {
        console.error("Error obteniendo ubicación exacta");
    }
}

document.getElementById("cityInput").addEventListener("input", (eventOnClick) => {
    const query = eventOnClick.target.value;
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
            resultsContainer.innerHTML = results.map(city =>{
                const nameToShow = sanitizeCityName(city.name);
                return `
                <div class="searchItem" onclick="selectCity(${city.latitude}, ${city.longitude}, '${nameToShow}')">
                    <strong>${city.name}</strong> (${city.country})
                </div>
            `;}).join('');
        } catch (e) {
            console.error("Tal vez tengas el mapa al reves?");
        }
    }, 500);
});

function renderFavoritesList() {
    const favContainer = document.getElementById("favoritesList");
    const favs = getFavorites();

    favContainer.innerHTML = favs.map(fav => `
        <div class="favItem">
            <button onclick="displayWeather(${fav.lat}, ${fav.lon}, '${fav.name}')">${fav.name}</button>
            <span class="deleteFav" onclick="deleteFavorite('${fav.name}')">❌</span>
        </div>
    `).join('');
}

async function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    try {
        const response = await fetch(url);
        return response.ok ? await response.json() : null;
    } catch (error) { return null; }
}

async function displayWeather(lat, lon, cityName = null) {
    const mainContainer = document.querySelector(".mainContainer");
    const data = await fetchWeather(lat, lon);

    if (!data) {
        mainContainer.innerHTML = "<p>Error de conexión.</p>";
        return;
    }

    let finalName = cityName;
    if (!finalName) {
        finalName = await getCityName(lat, lon) || data.timezone.split('/').pop().replace('_', ' ');
    }

    finalName = sanitizeCityName(finalName);

    document.getElementById("mainCityName").innerText = finalName;

    const { temperature_2m: temp, relative_humidity_2m: hum, wind_speed_10m: wind, is_day, weather_code: code } = data.current;
    document.body.className = is_day ? "dayMode" : "nightMode";

    mainContainer.innerHTML = `
        <section class="glassCard">
            <div id="actualWeather">
                <span class="mainIcon">${getWeatherIcon(code)}</span>
                <h2>${Math.round(temp)}º</h2>
                <p id="currentLocationName">${finalName}</p>
                <p class="recommendation"><strong>${getWeatherMessage(temp)}</strong></p>
            </div>
            
            <button onclick="saveFavorite('${finalName}', ${lat}, ${lon})">⭐ Guardar</button>

            <div class="forecastContainer">
                ${data.daily.time.map((date, index) => `
                    <div class="forecastItem">
                        <p>${new Date(date).toLocaleDateString('es-ES', {weekday: 'short'})}</p>
                        <span>${getWeatherIcon(data.daily.weather_code[index])}</span>
                        <p>${Math.round(data.daily.temperature_2m_max[index])}º / ${Math.round(data.daily.temperature_2m_min[index])}º</p>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

function getCoordinates() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) return resolve(defaultLocation);
        
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            () => resolve(defaultLocation),
            { 
                enableHighAccuracy: true,
                timeout: 5000, 
                maximumAge: 0 
            }
        );
    });
}

async function initApp() {
    renderFavoritesList();
    const coords = await getCoordinates();
    const name = await getCityName(coords.lat, coords.lon);
    displayWeather(coords.lat, coords.lon, name);
}

initApp();