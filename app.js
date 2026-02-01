// // /*
// // /*
// // const weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=43.3713&longitude=-8.396&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index&timezone=auto"

// // async function fetchWeather() {
// //     const url = weatherApi;
// //     try {
// //         const response = await fetch(weatherApi);
// //         if (!response.ok) {
// //             throw new Error(`Response status: ${response.status}`);
// //         }
// //         return await response.json();
// //     } catch (error) {
// //     console.error("NO hemos podido encontrar el tiempo, mejor mira por la ventana", error);
// //     return null;
// //     }
// // }

// // async function displayWeather() {
// //     const actualWeather = document.getElementById("actualWeather");
// //     const temperatureMain = await fetchWeather();
// //     /*if (!temperatureMain) {
// //         section.innerHTML = "<p>No se pudieron cargar los personajes</p>"
// //         return
// //     }
// //     const tempActualSection = createTempCard (temperatureMain)
// //     actualWeather.innerHTML = tempActualSection */
// // /*
// //     if (!data) {
// //         mainContainer.innerHTML = "<p>No se pudieron cargar los datos del clima.</p>";
// //         return;
// //     }

// //     // Extraemos los datos actuales
// //     const { temperature_2m, relative_humidity_2m, wind_speed_10m, wind_direction_10m, uv_index } = data.current;

// //     // Actualizamos el contenedor principal con la información recibida
// //     mainContainer.innerHTML = `
// //         <section>
// //             <div id="actualWeather">
// //                 <h2>${Math.round(temperature_2m)}º</h2>
// //                 <p>Temperatura actual</p>
// //             </div>
// //             <div class="details">
// //                 <p><strong>Humedad:</strong> ${relative_humidity_2m}%</p>
// //                 <p><strong>Viento:</strong> ${wind_speed_10m} km/h</p>
// //                 <p><strong>Dirección:</strong> ${wind_direction_10m}°</p>
// //                 <p><strong>Índice UV:</strong> ${uv_index}</p>
// //             </div>
// //         </section>
// //     `;
// // }

// // displayWeather();

// // */
// // /*

// // const weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=43.3713&longitude=-8.396&current=temperature_2m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto";

// // async function fetchWeather() {
// //     try {
// //         const response = await fetch(weatherApi);
// //         if (!response.ok) {
// //             throw new Error(`Error: ${response.status}`);
// //         }
// //         return await response.json();
// //     } catch (error) {
// //         console.error("Error al obtener el clima:", error);
// //         return null;
// //     }
// // }

// // // 7º parte
// // // Función limpia: Recibe datos, devuelve HTML
// // function renderForecast(daily) {
// //     // Usamos el array de fechas como base para mapear
// //     return daily.time.map((date, index) => {
// //         const max = Math.round(daily.temperature_2m_max[index]);
// //         const min = Math.round(daily.temperature_2m_min[index]);
        
// //         // Convertimos la fecha en nombre del día (lun, mar...)
// //         const dayName = new Date(date).toLocaleDateString('es-ES', { weekday: 'short' });

// //         return `
// //             <div class="forecast-item">
// //                 <p class="day-name">${dayName}</p>
// //                 <div class="forecast-temps">
// //                     <span class="max">${max}º</span>
// //                     <span class="min">${min}º</span>
// //                 </div>
// //             </div>
// //         `;
// //     }).join(''); // Unimos el array en un solo string
// // }

// // async function displayWeather() {
// //     const mainContainer = document.getElementById("actualWeather");
// //     const data = await fetchWeather();
// //             /* Second part*/ /*
// //     const body = document.body; // Seleccionamos el body para cambiar el fondo 

// //     if (!data) {
// //         mainContainer.innerHTML = "<p>No se pudieron cargar los datos del clima.</p>";
// //         return;
// //     }

// //     const { temperature_2m, relative_humidity_2m, wind_speed_10m, wind_direction_10m, uv_index, is_day } = data.current;

// //     //4 parte

// //     if (is_day === 1) {
// //         body.className = "day-mode"; // Aplica clase de día
// //     } else {
// //         body.className = "night-mode"; // Aplica clase de noche
// //     }271


// //         // 3º parte
// //     // 1. LÓGICA DE COLORES Y MENSAJES
// //     let mensaje = ""; // Variable vacía para el texto

// //     if (temperature_2m < 10) {
// //         mensaje = "¡Abrígate bien, que hace frío!";
// //         body.style.backgroundColor = "#a1c4fd"; // Azul frío
// //         document.querySelector("header").style.backgroundColor = "#c2e9fb";
// //     } else if (temperature_2m >= 10 && temperature_2m <= 20) {
// //         mensaje = "El tiempo está agradable.";
// //         body.style.backgroundColor = "#d4fc79"; // Verde suave
// //         document.querySelector("header").style.backgroundColor = "#96e6a1";
// //     } else {
// //         mensaje = "¡Qué calor! No olvides hidratarte.";
// //         body.style.backgroundColor = "#ffecd2"; // Naranja cálido
// //         document.querySelector("header").style.backgroundColor = "#fcb69f";
// //     }

// //         /* Second part*/
// //     // --- LÓGICA DE COLOR ---
// //     /*
    
// //     if (temperature_2m > 20) {
// //         body.style.backgroundColor = "#ffecd2"; // Color cálido (naranja clarito)
// //         document.querySelector("header").style.backgroundColor = "#fcb69f";
// //     } else {
// //         body.style.backgroundColor = "#d4fc79"; // Color fresco (verde/azul)
// //         document.querySelector("header").style.backgroundColor = "#96e6a1";
// //     }
// //     // -----------------------

// //     //---



// //     mainContainer.innerHTML = `
// //         <section>
// //             <div>
// //                 <h2>${Math.round(temperature_2m)}º</h2>
// //                 <p>Temperatura actual</p>
// //                 <p class="recommendation"><strong>${mensaje}</strong></p> <!--3 parte-->
// //             </div>
// //             <div class="details">
// //                 <p><strong>Humedad:</strong> ${relative_humidity_2m}%</p>
// //                 <p><strong>Viento:</strong> ${wind_speed_10m} km/h</p>
// //                 <p><strong>Dirección:</strong> ${wind_direction_10m}°</p>
// //                 <p><strong>Índice UV:</strong> ${uv_index}</p>
// //             </div>
// //         </section>
// //             <!-- septimaparte-->   
// //         <div class="forecast-container">
// //                 ${renderForecast(data.daily)}
// //             </div>
// //     `;

// //         /* Second part*/
// //     // --- LÓGICA DE COLOR ---
// //     /*
    
// //     if (temperature_2m > 20) {
// //         body.style.backgroundColor = "#ffecd2"; // Color cálido (naranja clarito)
// //         document.querySelector("header").style.backgroundColor = "#fcb69f";
// //     } else {
// //         body.style.backgroundColor = "#d4fc79"; // Color fresco (verde/azul)
// //         document.querySelector("header").style.backgroundColor = "#96e6a1";
// //     }
// //     // -----------------------


// // displayWeather();


// // // 6 parte idea de refactorización clean code
// // /*
// // const weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=43.3713&longitude=-8.396&current=temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index,is_day&timezone=auto";

// // // Función auxiliar para obtener el mensaje (Sustituye los if-else)
// // function getWeatherMessage(temp) {
// //     if (temp < 10) return "¡Abrígate bien, hace frío!";
// //     if (temp <= 20) return "El tiempo está agradable.";
// //     return "¡Qué calor! Hidrátate.";
// // }

// // async function fetchWeather() {
// //     try {
// //         const response = await fetch(weatherApi);
// //         return response.ok ? await response.json() : null;
// //     } catch (error) {
// //         return null;
// //     }
// // }

// // async function displayWeather() {
// //     const data = await fetchWeather();
// //     const mainContainer = document.querySelector(".mainContainer");

// //     // Guard Clause: Si no hay datos, cortamos aquí
// //     if (!data) {
// //         mainContainer.innerHTML = "<p>No se pudieron cargar los datos.</p>";
// //         return;
// //     }

// //     const { temperature_2m: temp, relative_humidity_2m: hum, wind_speed_10m: wind, uv_index: uv, is_day } = data.current;

// //     // Aplicar tema (Ternario)
// //     document.body.className = is_day ? "day-mode" : "night-mode";

// //     // Inyectar HTML limpio
// //     mainContainer.innerHTML = `
// //         <section class="glass-card">
// //             <div id="actualWeather">
// //                 <h2>${Math.round(temp)}º</h2>
// //                 <p>Temperatura actual</p>
// //                 <p class="recommendation"><strong>${getWeatherMessage(temp)}</strong></p>
// //             </div>
// //             <div class="details">
// //                 <p><strong>Humedad:</strong> ${hum}%</p>
// //                 <p><strong>Viento:</strong> ${wind} km/h</p>
// //                 <p><strong>Índice UV:</strong> ${uv}</p>
// //             </div>
// //         </section>
// //     `;
// // }

// // displayWeather(); */

// // /*del primero de todo */

// // const DEFAULT_LOCATION = { lat: 43.3713, lon: -8.396 };

// // /* Como se consigue la url del api?*/

// // //const weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=43.3713&longitude=-8.396&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto";
// // const weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}.396&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto";

// // function getCoordinates() {
// //     return new Promise((resolve) => {
// //         // Si el navegador no soporta geo o el usuario deniega, devolvemos la posición por defecto
// //         if (!navigator.geolocation) {
// //             resolve(DEFAULT_LOCATION);
// //             return;
// //         }

// //         navigator.geolocation.getCurrentPosition(
// //             (position) => {
// //                 resolve({
// //                     lat: position.coords.latitude,
// //                     lon: position.coords.longitude
// //                 });
// //             },
// //             () => resolve(DEFAULT_LOCATION) // Si hay error (denegado), resolvemos con la por defecto
// //         );
// //     });
// // }

// // async function fetchWeather(lat, lon) {
// //     // esta linea estaba repetida  const url = weatherApi;
// //     try {
// //         const response = await fetch(weatherApi);
// //         if (!response.ok) {
// //             throw new Error(`Response status: ${response.status}`);
// //         }
// //         return await response.json();
// //     } catch (error) {
// //     console.error("NO hemos podido encontrar el tiempo, mejor mira por la ventana", error);
// //     return null;
// //     }
// // }


// // // Función para los mensajes (Clean Code: una sola responsabilidad)
// // function getWeatherMessage(temp) {
// //     if (temp < 10) return "¡Abrígate bien, hace frío!";
// //     if (temp <= 20) return "El tiempo está agradable.";
// //     return "¡Qué calor! Hidrátate.";
// // }

// // //8 parte
// // const weatherIcons = {
// //     0: "☀️", // Cielo despejado
// //     1: "🌤️", 2: "⛅", 3: "☁️", // Nubosidad variable
// //     45: "🌫️", 48: "🌫️", // Niebla
// //     51: "🌦️", 53: "🌦️", 55: "🌦️", // Llovizna
// //     61: "🌧️", 63: "🌧️", 65: "🌧️", // Lluvia
// //     71: "❄️", 73: "❄️", 75: "❄️", // Nieve
// //     80: "🌦️", 81: "🌦️", 82: "🌧️", // Chubascos
// //     95: "⛈️", // Tormenta
// // };

// // // Función de ayuda (Helper)
// // const getWeatherIcon = (code) => weatherIcons[code] || "🌡️";

// // // Función para el pronóstico
// // function renderForecast(daily = {}) {
// //     if (!daily.time) return "";
    
// //     return daily.time.map((date, index) => {
// //         const max = Math.round(daily.temperature_2m_max[index]);
// //         const min = Math.round(daily.temperature_2m_min[index]);
// //         const dayName = new Date(date).toLocaleDateString('es-ES', { weekday: 'short' });
// //         //añadido 8 parte
// //         const icon = getWeatherIcon(daily.weather_code[index]); // ¡Traductor aplicado!

// //         return `
// //             <div class="forecast-item">
// //                 <p class="day-name">${dayName}</p>
// //                 <span class="forecast-icon">${icon}</span> 
// //                 <div class="forecast-temps">
// //                     <span class="max">${max}º</span>
// //                     <span class="min">${min}º</span>
// //                 </div>
// //             </div>
// //         `;
// //     }).join('');
// // }

// // async function displayWeather(lat, lon) {
// //     const mainContainer = document.querySelector(".mainContainer");
// //     const data = await fetchWeather(lat, lon);

// //     if (!data) {
// //         mainContainer.innerHTML = "<p>Error al cargar los datos</p>";
// //         return;
// //     }

// //     // EXTRAEMOS TODO: Renombramos variables largas a nombres cortos y limpios
// //     const { 
// //         temperature_2m: temp, 
// //         relative_humidity_2m: hum, 
// //         wind_speed_10m: wind, 
// //         uv_index: uv, 
// //         is_day 
// //     } = data.current;

// //     const { daily } = data;

// //     // Cambiar tema
// //     document.body.className = is_day ? "day-mode" : "night-mode";

// //     // Pintar todo el HTML
// //     mainContainer.innerHTML = `
// //         <section class="glass-card">
// //             <div id="actualWeather">
// //                 <h2>${Math.round(temp)}º</h2>
// //                 <p>Temple, ahora</p>
// //                 <p class="recommendation"><strong>${getWeatherMessage(temp)}</strong></p>
// //             </div>

// //             <div class="details">
// //                 <p><strong>Humedad:</strong> ${hum}%</p>
// //                 <p><strong>Viento:</strong> ${wind} km/h</p>
// //                 <p><strong>Índice UV:</strong> ${uv}</p>
// //             </div>

// //             <div class="forecast-container">
// //                 ${renderForecast(daily)}
// //             </div>
// //         </section>
// //     `;
// // }



// // async function initApp() {
// //     const coords = await getCoordinates();
// //     // Una vez tenemos las coordenadas (reales o por defecto), cargamos el clima
// //     displayWeather(coords.lat, coords.lon);
// // }

// // // Reemplazamos el antiguo displayWeather() por:
// // initApp();
// // /* Octava parte creo codigos tiempo
// // le falta esta parte pero si solo la añado no funciona porque el link al api no sse lo pide
// // <p><strong>Dirección:</strong> ${wind_direction_10m}°</p>
// // */


// // /*
// // Esta es una excelente mejora de Clean Code y experiencia de usuario. Para lograrlo, usaremos la API nativa del navegador navigator.geolocation, que es gratuita y no requiere librerías externas.

// // La clave aquí es que fetchWeather ahora debe ser flexible y aceptar latitud y longitud como parámetros.

// // 1. Variables de configuración (Clean Code)
// // Primero, definimos nuestra ubicación por defecto (Temple, Coruña) al principio del archivo.

// // JavaScript
// // const DEFAULT_LOCATION = { lat: 43.3713, lon: -8.396 };
// // 2. Función fetchWeather Refactorizada
// // Ahora la función no tiene la URL "fija", sino que la construye dinámicamente:

// // JavaScript
// // async function fetchWeather(lat, lon) {
// //     // Usamos Template Literals para insertar las coordenadas
// //     const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    
// //     try {
// //         const response = await fetch(url);
// //         return response.ok ? await response.json() : null;
// //     } catch (error) {
// //         console.error("Error en la petición:", error);
// //         return null;
// //     }
// // }
// // 3. La lógica de Geolocalización
// // Para evitar el if-else anidado, crearemos una función que nos devuelva las coordenadas. Usaremos una Promesa para que el flujo de la app espere a que el usuario acepte o rechace el permiso.

// // JavaScript
// // function getCoordinates() {
// //     return new Promise((resolve) => {
// //         // Si el navegador no soporta geo o el usuario deniega, devolvemos la posición por defecto
// //         if (!navigator.geolocation) {
// //             resolve(DEFAULT_LOCATION);
// //             return;
// //         }

// //         navigator.geolocation.getCurrentPosition(
// //             (position) => {
// //                 resolve({
// //                     lat: position.coords.latitude,
// //                     lon: position.coords.longitude
// //                 });
// //             },
// //             () => resolve(DEFAULT_LOCATION) // Si hay error (denegado), resolvemos con la por defecto
// //         );
// //     });
// // }
// // 4. Función de inicio initApp
// // Para que el código sea limpio, creamos una función que arranque todo el proceso.

// // JavaScript
// // async function initApp() {
// //     const coords = await getCoordinates();
// //     // Una vez tenemos las coordenadas (reales o por defecto), cargamos el clima
// //     displayWeather(coords.lat, coords.lon);
// // }

// // // Reemplazamos el antiguo displayWeather() por:
// // initApp();
// // 5. Ajuste en displayWeather
// // Simplemente añadimos los parámetros al inicio:

// // JavaScript
// // async function displayWeather(lat, lon) {
// //     const mainContainer = document.querySelector(".mainContainer");
// //     const data = await fetchWeather(lat, lon);
    
// //     // El resto del código que ya tienes permanece igual...
// //     // Usando 'data.current', 'renderForecast(data.daily)', etc.
// // }
// // ¿Por qué esto es Clean Code?
// // Responsabilidad Única (SRP):

// // getCoordinates: Solo se encarga de saber dónde está el usuario.

// // fetchWeather: Solo se encarga de hablar con Open-Meteo.

// // displayWeather: Solo se encarga de pintar en el HTML.

// // Desacoplamiento: La función de clima ya no depende de una ubicación fija; ahora puede pintar el tiempo de cualquier lugar del mundo si le pasas las coordenadas.

// // Manejo de errores silencioso: Si el usuario pulsa "Bloquear" en el permiso de ubicación, la app no se rompe ni lanza errores feos, simplemente carga la ubicación por defecto de forma fluida.

// // ¿Quieres que probemos a añadir el nombre de la ciudad? Como no queremos usar otras APIs, podemos intentar extraer la zona horaria de Open-Meteo (que suele decir algo como "Europe/Madrid") para dar una pista de dónde estamos.
// // */

// // 1. Configuración y Constantes
// const DEFAULT_LOCATION = { lat: 43.3713, lon: -8.396 };

// const weatherIcons = {
//     0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
//     45: "🌫️", 48: "🌫️", 51: "🌦️", 53: "🌦️", 55: "🌦️",
//     61: "🌧️", 63: "🌧️", 65: "🌧️", 71: "❄️", 73: "❄️", 75: "❄️",
//     80: "🌦️", 81: "🌦️", 82: "🌧️", 95: "⛈️"
// };

// // 2. Funciones de Apoyo (Helpers)
// const getWeatherIcon = (code) => weatherIcons[code] || "🌡️";

// function getWeatherMessage(temp) {
//     if (temp < 10) return "¡Abrígate bien, hace frío!";
//     if (temp <= 20) return "El tiempo está agradable.";
//     return "¡Qué calor! Hidrátate.";
// }

// // 3. Lógica de Localización
// function getCoordinates() {
//     return new Promise((resolve) => {
//         if (!navigator.geolocation) return resolve(DEFAULT_LOCATION);
        
//         navigator.geolocation.getCurrentPosition(
//             (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
//             () => resolve(DEFAULT_LOCATION)
//         );
//     });
// }

// // 4. Petición a la API (URL dinámica)
// async function fetchWeather(lat, lon) {
//     // La URL se construye AQUÍ dentro para usar lat y lon correctamente
//     const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    
//     try {
//         const response = await fetch(url);
//         return response.ok ? await response.json() : null;
//     } catch (error) {
//         console.error("Error al consultar API:", error);
//         return null;
//     }
// }

// // 5. Renderizado de Pronóstico
// function renderForecast(daily = {}) {
//     if (!daily.time) return "";
    
//     return daily.time.map((date, index) => {
//         const dayName = new Date(date).toLocaleDateString('es-ES', { weekday: 'short' });
//         return `
//             <div class="forecast-item">
//                 <p class="day-name">${dayName}</p>
//                 <span class="forecast-icon">${getWeatherIcon(daily.weather_code[index])}</span>
//                 <div class="forecast-temps">
//                     <span class="max">${Math.round(daily.temperature_2m_max[index])}º</span>
//                     <span class="min">${Math.round(daily.temperature_2m_min[index])}º</span>
//                 </div>
//             </div>
//         `;
//     }).join('');
// }

// // 6. Función Principal de Interfaz
// async function displayWeather(lat, lon) {
//     const mainContainer = document.querySelector(".mainContainer");
//     const data = await fetchWeather(lat, lon);

//     if (!data) {
//         mainContainer.innerHTML = "<p>Error al obtener datos del servidor.</p>";
//         return;
//     }

//     const { temperature_2m: temp, relative_humidity_2m: hum, wind_speed_10m: wind, wind_direction_10m: dir, uv_index: uv, is_day, weather_code: code } = data.current;
    
//     document.body.className = is_day ? "day-mode" : "night-mode";

//     mainContainer.innerHTML = `
//         <section class="glass-card">
//             <div id="actualWeather">
//                 <span class="main-icon">${getWeatherIcon(code)}</span>
//                 <h2>${Math.round(temp)}º</h2>
//                 <p>${data.timezone.split('/')[1] || 'Ubicación actual'}</p>
//                 <p class="recommendation"><strong>${getWeatherMessage(temp)}</strong></p>
//             </div>

//             <div class="details">
//                 <p><strong>Humedad:</strong> ${hum}%</p>
//                 <p><strong>Viento:</strong> ${wind} km/h</p>
//                 <p><strong>Dirección:</strong> ${dir}°</p>
//                 <p><strong>Índice UV:</strong> ${uv}</p>
//             </div>

//             <div class="forecast-container">
//                 ${renderForecast(data.daily)}
//             </div>
//         </section>
//     `;
// }

// // 7. Inicio de la App
// async function initApp() {
//     const { lat, lon } = await getCoordinates();
//     displayWeather(lat, lon);
// }

// initApp();
// ¿Por qué fallaba y qué hemos arreglado?
// Template Literals mal usados: Tenías ${lat} en una cadena de texto fuera de la función. Las variables lat y lon solo existen cuando el navegador nos las da. He movido la URL dentro de fetchWeather.

// Limpieza de comentarios: Tenías varias definiciones de displayWeather y fetchWeather una debajo de otra. El navegador se confunde o usa siempre la última versión que encuentra.

// Extracción de Ciudad: He añadido ${data.timezone.split('/')[1]}. Esto toma la zona horaria (ej: "Europe/Madrid") y escribe solo "Madrid", así no dice siempre "Temple" si el usuario está en otro sitio.

// Parámetros en displayWeather: Ahora la función acepta lat y lon, y se los pasa correctamente al fetch.

// Siguiente paso: Con esto el código debería ser 100% funcional. ¿Te gustaría que probáramos a añadir una pequeña animación de carga (un spinner) para que el usuario sepa que la app está buscando su posición?

// 1. Configuración y Constantes
const DEFAULT_LOCATION = { lat: 43.3713, lon: -8.396 };

const weatherIcons = {
    0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
    45: "🌫️", 48: "🌫️", 51: "🌦️", 53: "🌦️", 55: "🌦️",
    61: "🌧️", 63: "🌧️", 65: "🌧️", 71: "❄️", 73: "❄️", 75: "❄️",
    80: "🌦️", 81: "🌦️", 82: "🌧️", 95: "⛈️"
};

// 2. Funciones de Apoyo (Helpers)
const getWeatherIcon = (code) => weatherIcons[code] || "🌡️";

function getWeatherMessage(temp) {
    if (temp < 10) return "¡Abrígate bien, hace frío!";
    if (temp <= 20) return "El tiempo está agradable.";
    return "¡Qué calor! Hidrátate.";
}

// 3. Lógica de Localización
function getCoordinates() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) return resolve(DEFAULT_LOCATION);
        
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            () => resolve(DEFAULT_LOCATION)
        );
    });
}

// 4. Petición a la API (URL dinámica)
async function fetchWeather(lat, lon) {
    // La URL se construye AQUÍ dentro para usar lat y lon correctamente
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    
    try {
        const response = await fetch(url);
        return response.ok ? await response.json() : null;
    } catch (error) {
        console.error("Error al consultar API:", error);
        return null;
    }
}

// 5. Renderizado de Pronóstico
function renderForecast(daily = {}) {
    if (!daily.time) return "";
    
    return daily.time.map((date, index) => {
        const dayName = new Date(date).toLocaleDateString('es-ES', { weekday: 'short' });
        return `
            <div class="forecast-item">
                <p class="day-name">${dayName}</p>
                <span class="forecast-icon">${getWeatherIcon(daily.weather_code[index])}</span>
                <div class="forecast-temps">
                    <span class="max">${Math.round(daily.temperature_2m_max[index])}º</span>
                    <span class="min">${Math.round(daily.temperature_2m_min[index])}º</span>
                </div>
            </div>
        `;
    }).join('');
}

// 6. Función Principal de Interfaz
async function displayWeather(lat, lon) {
    const mainContainer = document.querySelector(".mainContainer");
    const data = await fetchWeather(lat, lon);

    if (!data) {
        mainContainer.innerHTML = "<p>Error al obtener datos del servidor.</p>";
        return;
    }

    const { temperature_2m: temp, relative_humidity_2m: hum, wind_speed_10m: wind, wind_direction_10m: dir, uv_index: uv, is_day, weather_code: code } = data.current;
    
    document.body.className = is_day ? "day-mode" : "night-mode";

    mainContainer.innerHTML = `
        <section class="glass-card">
            <div id="actualWeather">
                <span class="main-icon">${getWeatherIcon(code)}</span>
                <h2>${Math.round(temp)}º</h2>
                <p>${data.timezone.split('/')[1] || 'Ubicación actual'}</p>
                <p class="recommendation"><strong>${getWeatherMessage(temp)}</strong></p>
            </div>

            <div class="details">
                <p><strong>Humedad:</strong> ${hum}%</p>
                <p><strong>Viento:</strong> ${wind} km/h</p>
                <p><strong>Dirección:</strong> ${dir}°</p>
                <p><strong>Índice UV:</strong> ${uv}</p>
            </div>

            <div class="forecast-container">
                ${renderForecast(data.daily)}
            </div>
        </section>
    `;
}

// 7. Inicio de la App
async function initApp() {
    const { lat, lon } = await getCoordinates();
    displayWeather(lat, lon);
}

initApp();