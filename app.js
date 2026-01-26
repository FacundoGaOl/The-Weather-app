const defaultLat = 40.4168;
const defaultLon = -3.7038;

async function initApp() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherData(latitude, longitude);
            },
            (error) => {
                console.warn("Permiso de ubicación denegado, usando Madrid por defecto.");
                getWeatherData(defaultLat, defaultLon);
            }
        );
    } else {
        getWeatherData(defaultLat, defaultLon);
    }
}

async function getWeatherData(lat, lon) {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    const cityUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=es`;
try {
        const [weatherRes, cityRes] = await Promise.all([
            fetch(weatherUrl),
            fetch(cityUrl)
        ]);

        const weatherData = await weatherRes.json();
        const cityData = await cityRes.json();

        document.getElementById('cityName').textContent = cityData.city || cityData.locality || "Ubicación desconocida";
        
        updateUI(weatherData);
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

function updateUI(data) {
    const currentCode = data.current.weather_code;

    document.getElementById('mainTemp').textContent = Math.round(data.current.temperature_2m);
    document.getElementById('weatherDescription').textContent = translateWeatherCode(currentCode);

    updateBackground(currentCode);

    const loader = document.getElementById('loadingScreen');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 800);

    const hourlyContainer = document.getElementById('hourlyContainer');
    hourlyContainer.innerHTML = "";
    const now = new Date().getHours();
    for (let i = now; i < now + 6; i++) {
        if (!data.hourly.time[i]) break;
        const time = data.hourly.time[i].split("T")[1];
        const temp = Math.round(data.hourly.temperature_2m[i]);
        
        hourlyContainer.innerHTML += `
            <div class="hourlyItem">
                <p>${time}</p>
                <p><strong>${temp}°C</strong></p>
            </div>
        `;
    }

    const dailyContainer = document.getElementById('dailyContainer');
    dailyContainer.innerHTML = ""; 
    for (let i = 0; i < 7; i++) {
        const dateRaw = data.daily.time[i];
        const maxTemp = Math.round(data.daily.temperature_2m_max[i]);
        const minTemp = Math.round(data.daily.temperature_2m_min[i]);
        const code = data.daily.weather_code[i];

        dailyContainer.innerHTML += `
            <div class="dailyItem">
                <span class="dayName">${formatDay(dateRaw)}</span>
                <span class="dayIcon">${translateWeatherCode(code)}</span>
                <span class="dayTemp"><strong>${maxTemp}°</strong> / ${minTemp}°</span>
            </div>
        `;
    }
}

function formatDay(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase();
}

function translateWeatherCode(code) {
    const codes = {
        0: "Cielo despejado ☀️",
        1: "Principalmente despejado",
        2: "Parcialmente nublado",
        3: "Nublado ☁️",
        45: "Niebla 🌫️",
        48: "Niebla con escarcha",
        51: "Llovizna ligera 🌧️",
        53: "Llovizna moderada",
        55: "Llovizna intensa",
        56: "Llovizna ligera helada",
        57: "Llovizna intensa helada",
        61: "Lluvia débil 🌧️",
        63: "Lluvia moderada",
        65: "Lluvia intensa",
        66: "Lluvia helada ligera",
        67: "Lluvia helada intensa",
        71: "Nieve ligera ❄️",
        73: "Nieve moderada",
        75: "Nieve intensa",
        77: "Granizo",
        80: "Chubascos ligeros 🌦️",
        81: "Chubascos moderados",
        82: "Chubascos fuertes",
        85: "Nevadas ligeras",
        86: "Nevadas intensas",
        95: "Tormenta eléctrica ⛈️",
        96: "Tormenta con granizo ligero",
        99: "Tormenta con granizo intenso"
    };
    return codes[code] || "Clima variado";
}

document.getElementById('searchBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    if (!city) return;

    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=es&format=json`;
        const res = await fetch(geoUrl);
        const data = await res.json();

        if (data.results && data.results.length > 0) {
            const { latitude, longitude, name } = data.results[0];
            getWeatherData(latitude, longitude);
            document.getElementById('cityName').textContent = name;
        } else {
            alert("Ciudad no encontrada");
        }
    } catch (e) {
        console.error("Error buscando ciudad", e);
    }
});

function updateBackground(code) {
    const body = document.body;
    body.className = ""; 
    
    if (code === 0) body.classList.add('bg-sunny');
    else if (code >= 1 && code <= 3) body.classList.add('bg-cloudy');
    else if (code >= 51 && code <= 67) body.classList.add('bg-rainy');
    else body.classList.add('bg-default');
}

// 1. Estado de favoritos
let favorites = JSON.parse(localStorage.getItem('weatherFavs')) || [];

// 2. Función para guardar/quitar favorito
function toggleFavorite() {
    const cityName = document.getElementById('cityName').textContent;
    // Evitamos guardar si aún no ha cargado la ciudad
    if (cityName === "Detectando ubicación..." || cityName === "Ubicación desconocida") return;

    const index = favorites.indexOf(cityName);
    if (index === -1) {
        favorites.push(cityName);
    } else {
        favorites.splice(index, 1);
    }

    localStorage.setItem('weatherFavs', JSON.stringify(favorites));
    renderFavorites();
}

// 3. Función para pintar los favoritos en pantalla
function renderFavorites() {
    const container = document.getElementById('favoritesSection');
    const list = document.getElementById('favoritesList');
    
    if (favorites.length === 0) {
        container.classList.add('hidden');
        return;
    }

    container.classList.remove('hidden');
    list.innerHTML = '';

    favorites.forEach(city => {
        const span = document.createElement('span');
        span.className = 'fav-item';
        span.textContent = city;
        // Al hacer click en un favorito, podríamos buscar esa ciudad (si implementas el buscador)
        list.appendChild(span);
    });
}

// 4. Inicializar eventos
document.getElementById('favBtn').addEventListener('click', toggleFavorite);

// Llama a renderFavorites() dentro de tu función initApp() para que carguen al abrir

initApp();