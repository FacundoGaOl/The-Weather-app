/******************************
 * REFERENCIAS AL DOM
 ******************************/
const locationElement = document.getElementById("location");
const currentWeatherElement = document.getElementById("currentWeather");
const forecastElement = document.getElementById("forecast");
const forecastTypeSelect = document.getElementById("forecastType");

let weatherData = null;

let hasFetchedWeather = false;

/******************************
 * FORMATEO DE FECHAS Y HORAS
 ******************************/
function formatDateTime(dateString, type = "date") {
    const date = new Date(dateString);
    const now = new Date();

    switch (type) {
        case "hour":
            return `${date.getHours()}:00`;

        case "day":
            return date.toLocaleDateString("es-ES", {
                weekday: "short",
                day: "numeric",
                month: "short"
            });

        case "label":
            const diff = date.getDate() - now.getDate();
            if (diff === 0) return "Hoy";
            if (diff === 1) return "Mañana";
            return date.toLocaleDateString("es-ES", { weekday: "long" });

        default:
            return date.toLocaleString("es-ES");
    }
}

/******************************
 * CÓDIGOS METEOROLÓGICOS
 ******************************/
function getWeatherInfo(code) {
    const weatherCodes = {
        0: ["☀️", "Despejado"],
        1: ["🌤", "Poco nuboso"],
        2: ["⛅", "Parcialmente nuboso"],
        3: ["☁️", "Muy nuboso"],
        45: ["🌫", "Niebla"],
        48: ["🌫", "Niebla helada"],
        51: ["🌦", "Llovizna"],
        61: ["🌧", "Lluvia"],
        71: ["❄️", "Nieve"],
        95: ["⛈", "Tormenta"]
    };

    return weatherCodes[code] || ["❓", "Desconocido"];
}

/******************************
 * OBTENER CIUDAD Y PAÍS
 ******************************/
async function getCityAndCountry(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    const response = await fetch(url);
    const data = await response.json();

    const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "Ciudad desconocida";

    const country = data.address.country || "País desconocido";

    return { city, country };
}

/******************************
 * OBTENER DATOS METEOROLÓGICOS
 ******************************/
async function fetchWeather(lat, lon) {
    if (hasFetchedWeather) return;
    hasFetchedWeather = true;

    const url = `https://api.open-meteo.com/v1/forecast
?latitude=${lat}
&longitude=${lon}
&current_weather=true
&hourly=temperature_2m,weathercode
&daily=temperature_2m_max
&timezone=auto`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Open-Meteo error ${response.status}`);
        }

        const data = await response.json();

        weatherData = data;
        displayCurrentWeather(data);
        displayForecast(data);

    } catch (error) {
        console.error(error);
        currentWeatherElement.innerHTML =
            "<p>⚠️ Demasiadas peticiones. Espera unos minutos.</p>";
    }

    const DEV_MODE = true;
if (DEV_MODE) {
    locationElement.textContent = "📍 A Coruña, España";
    fetchWeather(43.3623, -8.4115);
}
}




/******************************
 * MOSTRAR TIEMPO ACTUAL
 ******************************/
function displayCurrentWeather(data) {
    if (!data.current_weather) {
        currentWeatherElement.innerHTML =
            "<p>No hay datos actuales disponibles</p>";
        return;
    }

    const temperature = data.current_weather.temperature;
    const weathercode = data.current_weather.weathercode;

    const [icon, description] = getWeatherInfo(weathercode);

    currentWeatherElement.innerHTML = `
        <h2>${icon} ${description}</h2>
        <p>${temperature} °C</p>
    `;
}

/******************************
 * MOSTRAR PRONÓSTICO
 ******************************/
function displayForecast(data) {
    forecastElement.innerHTML = "";

    if (!data.hourly || !data.daily) {
        forecastElement.innerHTML =
            "<p>No hay datos de pronóstico</p>";
        return;
    }

    if (forecastTypeSelect.value === "hourly") {
        data.hourly.time.slice(0, 12).forEach((time, index) => {
            const temp = data.hourly.temperature_2m[index];
            const code = data.hourly.weathercode[index];
            const [icon] = getWeatherInfo(code);

            forecastElement.innerHTML += `
                <div class="card">
                    <h4>${formatDateTime(time, "hour")}</h4>
                    <p>${icon}</p>
                    <p>${temp} °C</p>
                </div>
            `;
        });
    } else {
        data.daily.time.forEach((day, index) => {
            const temp = data.daily.temperature_2m_max[index];

            const code = data.daily.weathercode
                ? data.daily.weathercode[index]
                : data.hourly.weathercode[index * 24];

            const [icon] = getWeatherInfo(code);

            forecastElement.innerHTML += `
                <div class="card">
                    <h4>${formatDateTime(day, "label")}</h4>
                    <p>${icon}</p>
                    <p>${temp} °C</p>
                </div>
            `;
        });
    }
}

/******************************
 * EVENTO SELECTOR
 ******************************/
forecastTypeSelect.addEventListener("change", () => {
    if (weatherData) {
        displayForecast(weatherData);
    }
});

/******************************
 * GEOLOCALIZACIÓN INICIAL
 ******************************/
navigator.geolocation.getCurrentPosition(
    async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const location = await getCityAndCountry(lat, lon);
        locationElement.textContent = `📍 ${location.city}, ${location.country}`;

        fetchWeather(lat, lon);
    },
    error => {
        locationElement.textContent =
            "❌ No se pudo obtener la ubicación";
        console.error(error);
    }
);
