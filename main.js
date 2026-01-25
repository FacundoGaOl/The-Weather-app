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
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error en la petición a la API");
        
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error("Hubo un error:", error);
        document.getElementById('weather-description').textContent = "Error al cargar datos.";
    }
}

// 4. Función para pintar los datos en el HTML
function updateUI(data) {
    // Actualizamos temperatura actual
    document.getElementById('main-temp').textContent = Math.round(data.current.temperature_2m);
    
    // Traducimos el código de clima (WMO Code) de forma sencilla
    const code = data.current.weather_code;
    document.getElementById('weather-description').textContent = translateWeatherCode(code);

    // Pintar próximas horas (un ejemplo simple)
    const hourlyContainer = document.getElementById('hourly-container');
    hourlyContainer.innerHTML = ""; // Limpiamos antes de pintar
    
    // Solo mostramos las próximas 6 horas
    for (let i = 0; i < 6; i++) {
        const time = new Array(data.hourly.time[i].split("T")[1]); // Extrae solo la hora
        const temp = Math.round(data.hourly.temperature_2m[i]);
        
        hourlyContainer.innerHTML += `
            <div class="hourly-item">
                <p>${time}</p>
                <p><strong>${temp}°C</strong></p>
            </div>
        `;
    }
}

// Función auxiliar para entender los códigos de Open-Meteo
function translateWeatherCode(code) {
    const codes = {
        0: "Cielo despejado ☀️",
        1: "Principalmente despejado",
        2: "Parcialmente nublado",
        3: "Nublado ☁️",
        45: "Niebla",
        61: "Lluvia débil 🌧️",
    };
    return codes[code] || "Clima variado";
}

// Arrancamos la app al cargar el archivo
initApp();