/*
/*
const weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=43.3713&longitude=-8.396&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index&timezone=auto"

async function fetchWeather() {
    const url = weatherApi;
    try {
        const response = await fetch(weatherApi);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
    console.error("NO hemos podido encontrar el tiempo, mejor mira por la ventana", error);
    return null;
    }
}

async function displayWeather() {
    const actualWeather = document.getElementById("actualWeather");
    const temperatureMain = await fetchWeather();
    /*if (!temperatureMain) {
        section.innerHTML = "<p>No se pudieron cargar los personajes</p>"
        return
    }
    const tempActualSection = createTempCard (temperatureMain)
    actualWeather.innerHTML = tempActualSection */
/*
    if (!data) {
        mainContainer.innerHTML = "<p>No se pudieron cargar los datos del clima.</p>";
        return;
    }

    // Extraemos los datos actuales
    const { temperature_2m, relative_humidity_2m, wind_speed_10m, wind_direction_10m, uv_index } = data.current;

    // Actualizamos el contenedor principal con la información recibida
    mainContainer.innerHTML = `
        <section>
            <div id="actualWeather">
                <h2>${Math.round(temperature_2m)}º</h2>
                <p>Temperatura actual</p>
            </div>
            <div class="details">
                <p><strong>Humedad:</strong> ${relative_humidity_2m}%</p>
                <p><strong>Viento:</strong> ${wind_speed_10m} km/h</p>
                <p><strong>Dirección:</strong> ${wind_direction_10m}°</p>
                <p><strong>Índice UV:</strong> ${uv_index}</p>
            </div>
        </section>
    `;
}

displayWeather();

*/
/*

const weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=43.3713&longitude=-8.396&current=temperature_2m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto";

async function fetchWeather() {
    try {
        const response = await fetch(weatherApi);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener el clima:", error);
        return null;
    }
}

// 7º parte
// Función limpia: Recibe datos, devuelve HTML
function renderForecast(daily) {
    // Usamos el array de fechas como base para mapear
    return daily.time.map((date, index) => {
        const max = Math.round(daily.temperature_2m_max[index]);
        const min = Math.round(daily.temperature_2m_min[index]);
        
        // Convertimos la fecha en nombre del día (lun, mar...)
        const dayName = new Date(date).toLocaleDateString('es-ES', { weekday: 'short' });

        return `
            <div class="forecast-item">
                <p class="day-name">${dayName}</p>
                <div class="forecast-temps">
                    <span class="max">${max}º</span>
                    <span class="min">${min}º</span>
                </div>
            </div>
        `;
    }).join(''); // Unimos el array en un solo string
}

async function displayWeather() {
    const mainContainer = document.getElementById("actualWeather");
    const data = await fetchWeather();
            /* Second part*/ /*
    const body = document.body; // Seleccionamos el body para cambiar el fondo 

    if (!data) {
        mainContainer.innerHTML = "<p>No se pudieron cargar los datos del clima.</p>";
        return;
    }

    const { temperature_2m, relative_humidity_2m, wind_speed_10m, wind_direction_10m, uv_index, is_day } = data.current;

    //4 parte

    if (is_day === 1) {
        body.className = "day-mode"; // Aplica clase de día
    } else {
        body.className = "night-mode"; // Aplica clase de noche
    }271


        // 3º parte
    // 1. LÓGICA DE COLORES Y MENSAJES
    let mensaje = ""; // Variable vacía para el texto

    if (temperature_2m < 10) {
        mensaje = "¡Abrígate bien, que hace frío!";
        body.style.backgroundColor = "#a1c4fd"; // Azul frío
        document.querySelector("header").style.backgroundColor = "#c2e9fb";
    } else if (temperature_2m >= 10 && temperature_2m <= 20) {
        mensaje = "El tiempo está agradable.";
        body.style.backgroundColor = "#d4fc79"; // Verde suave
        document.querySelector("header").style.backgroundColor = "#96e6a1";
    } else {
        mensaje = "¡Qué calor! No olvides hidratarte.";
        body.style.backgroundColor = "#ffecd2"; // Naranja cálido
        document.querySelector("header").style.backgroundColor = "#fcb69f";
    }

        /* Second part*/
    // --- LÓGICA DE COLOR ---
    /*
    
    if (temperature_2m > 20) {
        body.style.backgroundColor = "#ffecd2"; // Color cálido (naranja clarito)
        document.querySelector("header").style.backgroundColor = "#fcb69f";
    } else {
        body.style.backgroundColor = "#d4fc79"; // Color fresco (verde/azul)
        document.querySelector("header").style.backgroundColor = "#96e6a1";
    }
    // -----------------------

    //---



    mainContainer.innerHTML = `
        <section>
            <div>
                <h2>${Math.round(temperature_2m)}º</h2>
                <p>Temperatura actual</p>
                <p class="recommendation"><strong>${mensaje}</strong></p> <!--3 parte-->
            </div>
            <div class="details">
                <p><strong>Humedad:</strong> ${relative_humidity_2m}%</p>
                <p><strong>Viento:</strong> ${wind_speed_10m} km/h</p>
                <p><strong>Dirección:</strong> ${wind_direction_10m}°</p>
                <p><strong>Índice UV:</strong> ${uv_index}</p>
            </div>
        </section>
            <!-- septimaparte-->   
        <div class="forecast-container">
                ${renderForecast(data.daily)}
            </div>
    `;

        /* Second part*/
    // --- LÓGICA DE COLOR ---
    /*
    
    if (temperature_2m > 20) {
        body.style.backgroundColor = "#ffecd2"; // Color cálido (naranja clarito)
        document.querySelector("header").style.backgroundColor = "#fcb69f";
    } else {
        body.style.backgroundColor = "#d4fc79"; // Color fresco (verde/azul)
        document.querySelector("header").style.backgroundColor = "#96e6a1";
    }
    // -----------------------


displayWeather();


// 6 parte idea de refactorización clean code
/*
const weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=43.3713&longitude=-8.396&current=temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index,is_day&timezone=auto";

// Función auxiliar para obtener el mensaje (Sustituye los if-else)
function getWeatherMessage(temp) {
    if (temp < 10) return "¡Abrígate bien, hace frío!";
    if (temp <= 20) return "El tiempo está agradable.";
    return "¡Qué calor! Hidrátate.";
}

async function fetchWeather() {
    try {
        const response = await fetch(weatherApi);
        return response.ok ? await response.json() : null;
    } catch (error) {
        return null;
    }
}

async function displayWeather() {
    const data = await fetchWeather();
    const mainContainer = document.querySelector(".mainContainer");

    // Guard Clause: Si no hay datos, cortamos aquí
    if (!data) {
        mainContainer.innerHTML = "<p>No se pudieron cargar los datos.</p>";
        return;
    }

    const { temperature_2m: temp, relative_humidity_2m: hum, wind_speed_10m: wind, uv_index: uv, is_day } = data.current;

    // Aplicar tema (Ternario)
    document.body.className = is_day ? "day-mode" : "night-mode";

    // Inyectar HTML limpio
    mainContainer.innerHTML = `
        <section class="glass-card">
            <div id="actualWeather">
                <h2>${Math.round(temp)}º</h2>
                <p>Temperatura actual</p>
                <p class="recommendation"><strong>${getWeatherMessage(temp)}</strong></p>
            </div>
            <div class="details">
                <p><strong>Humedad:</strong> ${hum}%</p>
                <p><strong>Viento:</strong> ${wind} km/h</p>
                <p><strong>Índice UV:</strong> ${uv}</p>
            </div>
        </section>
    `;
}

displayWeather(); */

/*del primero de todo */


/* Como se consigue la url del api?*/

const weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=43.3713&longitude=-8.396&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto";

async function fetchWeather() {
    const url = weatherApi;
    try {
        const response = await fetch(weatherApi);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
    console.error("NO hemos podido encontrar el tiempo, mejor mira por la ventana", error);
    return null;
    }
}


// Función para los mensajes (Clean Code: una sola responsabilidad)
function getWeatherMessage(temp) {
    if (temp < 10) return "¡Abrígate bien, hace frío!";
    if (temp <= 20) return "El tiempo está agradable.";
    return "¡Qué calor! Hidrátate.";
}

// Función para el pronóstico
function renderForecast(daily = {}) {
    if (!daily.time) return "";
    
    return daily.time.map((date, index) => {
        const max = Math.round(daily.temperature_2m_max[index]);
        const min = Math.round(daily.temperature_2m_min[index]);
        const dayName = new Date(date).toLocaleDateString('es-ES', { weekday: 'short' });

        return `
            <div class="forecast-item">
                <p class="day-name">${dayName}</p>
                <div class="forecast-temps">
                    <span class="max">${max}º</span>
                    <span class="min">${min}º</span>
                </div>
            </div>
        `;
    }).join('');
}

async function displayWeather() {
    const mainContainer = document.querySelector(".mainContainer");
    const data = await fetchWeather();

    if (!data) {
        mainContainer.innerHTML = "<p>Error al cargar los datos</p>";
        return;
    }

    // EXTRAEMOS TODO: Renombramos variables largas a nombres cortos y limpios
    const { 
        temperature_2m: temp, 
        relative_humidity_2m: hum, 
        wind_speed_10m: wind, 
        uv_index: uv, 
        is_day 
    } = data.current;

    const { daily } = data;

    // Cambiar tema
    document.body.className = is_day ? "day-mode" : "night-mode";

    // Pintar todo el HTML
    mainContainer.innerHTML = `
        <section class="glass-card">
            <div id="actualWeather">
                <h2>${Math.round(temp)}º</h2>
                <p>Temple, ahora</p>
                <p class="recommendation"><strong>${getWeatherMessage(temp)}</strong></p>
            </div>

            <div class="details">
                <p><strong>Humedad:</strong> ${hum}%</p>
                <p><strong>Viento:</strong> ${wind} km/h</p>
                <p><strong>Índice UV:</strong> ${uv}</p>
            </div>

            <div class="forecast-container">
                ${renderForecast(daily)}
            </div>
        </section>
    `;
}

displayWeather();