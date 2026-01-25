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
    document.getElementById('mainTemp').textContent = Math.round(data.current.temperature_2m);
    const currentCode = data.current.weather_code;
    document.getElementById('weatherDescription').textContent = translateWeatherCode(currentCode);

    const hourlyContainer = document.getElementById('hourlyContainer');
    hourlyContainer.innerHTML = ""; 
    for (let i = 0; i < 6; i++) {
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

initApp();