// // // // // /*
// // // // // /*
// // // // // const weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=43.3713&longitude=-8.396&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index&timezone=auto"

// // // // // async function fetchWeather() {
// // // // //     const url = weatherApi;
// // // // //     try {
// // // // //         const response = await fetch(weatherApi);
// // // // //         if (!response.ok) {
// // // // //             throw new Error(`Response status: ${response.status}`);
// // // // //         }
// // // // //         return await response.json();
// // // // //     } catch (error) {
// // // // //     console.error("NO hemos podido encontrar el tiempo, mejor mira por la ventana", error);
// // // // //     return null;
// // // // //     }
// // // // // }

// // // // // async function displayWeather() {
// // // // //     const actualWeather = document.getElementById("actualWeather");
// // // // //     const temperatureMain = await fetchWeather();
// // // // //     /*if (!temperatureMain) {
// // // // //         section.innerHTML = "<p>No se pudieron cargar los personajes</p>"
// // // // //         return
// // // // //     }
// // // // //     const tempActualSection = createTempCard (temperatureMain)
// // // // //     actualWeather.innerHTML = tempActualSection */
// // // // // /*
// // // // //     if (!data) {
// // // // //         mainContainer.innerHTML = "<p>No se pudieron cargar los datos del clima.</p>";
// // // // //         return;
// // // // //     }

// // // // //     // Extraemos los datos actuales
// // // // //     const { temperature_2m, relative_humidity_2m, wind_speed_10m, wind_direction_10m, uv_index } = data.current;

// // // // //     // Actualizamos el contenedor principal con la información recibida
// // // // //     mainContainer.innerHTML = `
// // // // //         <section>
// // // // //             <div id="actualWeather">
// // // // //                 <h2>${Math.round(temperature_2m)}º</h2>
// // // // //                 <p>Temperatura actual</p>
// // // // //             </div>
// // // // //             <div class="details">
// // // // //                 <p><strong>Humedad:</strong> ${relative_humidity_2m}%</p>
// // // // //                 <p><strong>Viento:</strong> ${wind_speed_10m} km/h</p>
// // // // //                 <p><strong>Dirección:</strong> ${wind_direction_10m}°</p>
// // // // //                 <p><strong>Índice UV:</strong> ${uv_index}</p>
// // // // //             </div>
// // // // //         </section>
// // // // //     `;
// // // // // }

// // // // // displayWeather();

// // // // // */
// // // // // /*

// // // // // const weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=43.3713&longitude=-8.396&current=temperature_2m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto";

// // // // // async function fetchWeather() {
// // // // //     try {
// // // // //         const response = await fetch(weatherApi);
// // // // //         if (!response.ok) {
// // // // //             throw new Error(`Error: ${response.status}`);
// // // // //         }
// // // // //         return await response.json();
// // // // //     } catch (error) {
// // // // //         console.error("Error al obtener el clima:", error);
// // // // //         return null;
// // // // //     }
// // // // // }

// // // // // // 7º parte
// // // // // // Función limpia: Recibe datos, devuelve HTML
// // // // // function renderForecast(daily) {
// // // // //     // Usamos el array de fechas como base para mapear
// // // // //     return daily.time.map((date, index) => {
// // // // //         const max = Math.round(daily.temperature_2m_max[index]);
// // // // //         const min = Math.round(daily.temperature_2m_min[index]);
        
// // // // //         // Convertimos la fecha en nombre del día (lun, mar...)
// // // // //         const dayName = new Date(date).toLocaleDateString('es-ES', { weekday: 'short' });

// // // // //         return `
// // // // //             <div class="forecast-item">
// // // // //                 <p class="day-name">${dayName}</p>
// // // // //                 <div class="forecast-temps">
// // // // //                     <span class="max">${max}º</span>
// // // // //                     <span class="min">${min}º</span>
// // // // //                 </div>
// // // // //             </div>
// // // // //         `;
// // // // //     }).join(''); // Unimos el array en un solo string
// // // // // }

// // // // // async function displayWeather() {
// // // // //     const mainContainer = document.getElementById("actualWeather");
// // // // //     const data = await fetchWeather();
// // // // //             /* Second part*/ /*
// // // // //     const body = document.body; // Seleccionamos el body para cambiar el fondo 

// // // // //     if (!data) {
// // // // //         mainContainer.innerHTML = "<p>No se pudieron cargar los datos del clima.</p>";
// // // // //         return;
// // // // //     }

// // // // //     const { temperature_2m, relative_humidity_2m, wind_speed_10m, wind_direction_10m, uv_index, is_day } = data.current;

// // // // //     //4 parte

// // // // //     if (is_day === 1) {
// // // // //         body.className = "day-mode"; // Aplica clase de día
// // // // //     } else {
// // // // //         body.className = "night-mode"; // Aplica clase de noche
// // // // //     }271


// // // // //         // 3º parte
// // // // //     // 1. LÓGICA DE COLORES Y MENSAJES
// // // // //     let mensaje = ""; // Variable vacía para el texto

// // // // //     if (temperature_2m < 10) {
// // // // //         mensaje = "¡Abrígate bien, que hace frío!";
// // // // //         body.style.backgroundColor = "#a1c4fd"; // Azul frío
// // // // //         document.querySelector("header").style.backgroundColor = "#c2e9fb";
// // // // //     } else if (temperature_2m >= 10 && temperature_2m <= 20) {
// // // // //         mensaje = "El tiempo está agradable.";
// // // // //         body.style.backgroundColor = "#d4fc79"; // Verde suave
// // // // //         document.querySelector("header").style.backgroundColor = "#96e6a1";
// // // // //     } else {
// // // // //         mensaje = "¡Qué calor! No olvides hidratarte.";
// // // // //         body.style.backgroundColor = "#ffecd2"; // Naranja cálido
// // // // //         document.querySelector("header").style.backgroundColor = "#fcb69f";
// // // // //     }

// // // // //         /* Second part*/
// // // // //     // --- LÓGICA DE COLOR ---
// // // // //     /*
    
// // // // //     if (temperature_2m > 20) {
// // // // //         body.style.backgroundColor = "#ffecd2"; // Color cálido (naranja clarito)
// // // // //         document.querySelector("header").style.backgroundColor = "#fcb69f";
// // // // //     } else {
// // // // //         body.style.backgroundColor = "#d4fc79"; // Color fresco (verde/azul)
// // // // //         document.querySelector("header").style.backgroundColor = "#96e6a1";
// // // // //     }
// // // // //     // -----------------------

// // // // //     //---



// // // // //     mainContainer.innerHTML = `
// // // // //         <section>
// // // // //             <div>
// // // // //                 <h2>${Math.round(temperature_2m)}º</h2>
// // // // //                 <p>Temperatura actual</p>
// // // // //                 <p class="recommendation"><strong>${mensaje}</strong></p> <!--3 parte-->
// // // // //             </div>
// // // // //             <div class="details">
// // // // //                 <p><strong>Humedad:</strong> ${relative_humidity_2m}%</p>
// // // // //                 <p><strong>Viento:</strong> ${wind_speed_10m} km/h</p>
// // // // //                 <p><strong>Dirección:</strong> ${wind_direction_10m}°</p>
// // // // //                 <p><strong>Índice UV:</strong> ${uv_index}</p>
// // // // //             </div>
// // // // //         </section>
// // // // //             <!-- septimaparte-->   
// // // // //         <div class="forecast-container">
// // // // //                 ${renderForecast(data.daily)}
// // // // //             </div>
// // // // //     `;

// // // // //         /* Second part*/
// // // // //     // --- LÓGICA DE COLOR ---
// // // // //     /*
    
// // // // //     if (temperature_2m > 20) {
// // // // //         body.style.backgroundColor = "#ffecd2"; // Color cálido (naranja clarito)
// // // // //         document.querySelector("header").style.backgroundColor = "#fcb69f";
// // // // //     } else {
// // // // //         body.style.backgroundColor = "#d4fc79"; // Color fresco (verde/azul)
// // // // //         document.querySelector("header").style.backgroundColor = "#96e6a1";
// // // // //     }
// // // // //     // -----------------------


// // // // // displayWeather();


// // // // // // 6 parte idea de refactorización clean code
// // // // // /*
// // // // // const weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=43.3713&longitude=-8.396&current=temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index,is_day&timezone=auto";

// // // // // // Función auxiliar para obtener el mensaje (Sustituye los if-else)
// // // // // function getWeatherMessage(temp) {
// // // // //     if (temp < 10) return "¡Abrígate bien, hace frío!";
// // // // //     if (temp <= 20) return "El tiempo está agradable.";
// // // // //     return "¡Qué calor! Hidrátate.";
// // // // // }

// // // // // async function fetchWeather() {
// // // // //     try {
// // // // //         const response = await fetch(weatherApi);
// // // // //         return response.ok ? await response.json() : null;
// // // // //     } catch (error) {
// // // // //         return null;
// // // // //     }
// // // // // }

// // // // // async function displayWeather() {
// // // // //     const data = await fetchWeather();
// // // // //     const mainContainer = document.querySelector(".mainContainer");

// // // // //     // Guard Clause: Si no hay datos, cortamos aquí
// // // // //     if (!data) {
// // // // //         mainContainer.innerHTML = "<p>No se pudieron cargar los datos.</p>";
// // // // //         return;
// // // // //     }

// // // // //     const { temperature_2m: temp, relative_humidity_2m: hum, wind_speed_10m: wind, uv_index: uv, is_day } = data.current;

// // // // //     // Aplicar tema (Ternario)
// // // // //     document.body.className = is_day ? "day-mode" : "night-mode";

// // // // //     // Inyectar HTML limpio
// // // // //     mainContainer.innerHTML = `
// // // // //         <section class="glass-card">
// // // // //             <div id="actualWeather">
// // // // //                 <h2>${Math.round(temp)}º</h2>
// // // // //                 <p>Temperatura actual</p>
// // // // //                 <p class="recommendation"><strong>${getWeatherMessage(temp)}</strong></p>
// // // // //             </div>
// // // // //             <div class="details">
// // // // //                 <p><strong>Humedad:</strong> ${hum}%</p>
// // // // //                 <p><strong>Viento:</strong> ${wind} km/h</p>
// // // // //                 <p><strong>Índice UV:</strong> ${uv}</p>
// // // // //             </div>
// // // // //         </section>
// // // // //     `;
// // // // // }

// // // // // displayWeather(); */

// // // // // /*del primero de todo */

// // // // // const DEFAULT_LOCATION = { lat: 43.3713, lon: -8.396 };

// // // // // /* Como se consigue la url del api?*/

// // // // // //const weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=43.3713&longitude=-8.396&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto";
// // // // // const weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}.396&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto";

// // // // // function getCoordinates() {
// // // // //     return new Promise((resolve) => {
// // // // //         // Si el navegador no soporta geo o el usuario deniega, devolvemos la posición por defecto
// // // // //         if (!navigator.geolocation) {
// // // // //             resolve(DEFAULT_LOCATION);
// // // // //             return;
// // // // //         }

// // // // //         navigator.geolocation.getCurrentPosition(
// // // // //             (position) => {
// // // // //                 resolve({
// // // // //                     lat: position.coords.latitude,
// // // // //                     lon: position.coords.longitude
// // // // //                 });
// // // // //             },
// // // // //             () => resolve(DEFAULT_LOCATION) // Si hay error (denegado), resolvemos con la por defecto
// // // // //         );
// // // // //     });
// // // // // }

// // // // // async function fetchWeather(lat, lon) {
// // // // //     // esta linea estaba repetida  const url = weatherApi;
// // // // //     try {
// // // // //         const response = await fetch(weatherApi);
// // // // //         if (!response.ok) {
// // // // //             throw new Error(`Response status: ${response.status}`);
// // // // //         }
// // // // //         return await response.json();
// // // // //     } catch (error) {
// // // // //     console.error("NO hemos podido encontrar el tiempo, mejor mira por la ventana", error);
// // // // //     return null;
// // // // //     }
// // // // // }


// // // // // // Función para los mensajes (Clean Code: una sola responsabilidad)
// // // // // function getWeatherMessage(temp) {
// // // // //     if (temp < 10) return "¡Abrígate bien, hace frío!";
// // // // //     if (temp <= 20) return "El tiempo está agradable.";
// // // // //     return "¡Qué calor! Hidrátate.";
// // // // // }

// // // // // //8 parte
// // // // // const weatherIcons = {
// // // // //     0: "☀️", // Cielo despejado
// // // // //     1: "🌤️", 2: "⛅", 3: "☁️", // Nubosidad variable
// // // // //     45: "🌫️", 48: "🌫️", // Niebla
// // // // //     51: "🌦️", 53: "🌦️", 55: "🌦️", // Llovizna
// // // // //     61: "🌧️", 63: "🌧️", 65: "🌧️", // Lluvia
// // // // //     71: "❄️", 73: "❄️", 75: "❄️", // Nieve
// // // // //     80: "🌦️", 81: "🌦️", 82: "🌧️", // Chubascos
// // // // //     95: "⛈️", // Tormenta
// // // // // };

// // // // // // Función de ayuda (Helper)
// // // // // const getWeatherIcon = (code) => weatherIcons[code] || "🌡️";

// // // // // // Función para el pronóstico
// // // // // function renderForecast(daily = {}) {
// // // // //     if (!daily.time) return "";
    
// // // // //     return daily.time.map((date, index) => {
// // // // //         const max = Math.round(daily.temperature_2m_max[index]);
// // // // //         const min = Math.round(daily.temperature_2m_min[index]);
// // // // //         const dayName = new Date(date).toLocaleDateString('es-ES', { weekday: 'short' });
// // // // //         //añadido 8 parte
// // // // //         const icon = getWeatherIcon(daily.weather_code[index]); // ¡Traductor aplicado!

// // // // //         return `
// // // // //             <div class="forecast-item">
// // // // //                 <p class="day-name">${dayName}</p>
// // // // //                 <span class="forecast-icon">${icon}</span> 
// // // // //                 <div class="forecast-temps">
// // // // //                     <span class="max">${max}º</span>
// // // // //                     <span class="min">${min}º</span>
// // // // //                 </div>
// // // // //             </div>
// // // // //         `;
// // // // //     }).join('');
// // // // // }

// // // // // async function displayWeather(lat, lon) {
// // // // //     const mainContainer = document.querySelector(".mainContainer");
// // // // //     const data = await fetchWeather(lat, lon);

// // // // //     if (!data) {
// // // // //         mainContainer.innerHTML = "<p>Error al cargar los datos</p>";
// // // // //         return;
// // // // //     }

// // // // //     // EXTRAEMOS TODO: Renombramos variables largas a nombres cortos y limpios
// // // // //     const { 
// // // // //         temperature_2m: temp, 
// // // // //         relative_humidity_2m: hum, 
// // // // //         wind_speed_10m: wind, 
// // // // //         uv_index: uv, 
// // // // //         is_day 
// // // // //     } = data.current;

// // // // //     const { daily } = data;

// // // // //     // Cambiar tema
// // // // //     document.body.className = is_day ? "day-mode" : "night-mode";

// // // // //     // Pintar todo el HTML
// // // // //     mainContainer.innerHTML = `
// // // // //         <section class="glass-card">
// // // // //             <div id="actualWeather">
// // // // //                 <h2>${Math.round(temp)}º</h2>
// // // // //                 <p>Temple, ahora</p>
// // // // //                 <p class="recommendation"><strong>${getWeatherMessage(temp)}</strong></p>
// // // // //             </div>

// // // // //             <div class="details">
// // // // //                 <p><strong>Humedad:</strong> ${hum}%</p>
// // // // //                 <p><strong>Viento:</strong> ${wind} km/h</p>
// // // // //                 <p><strong>Índice UV:</strong> ${uv}</p>
// // // // //             </div>

// // // // //             <div class="forecast-container">
// // // // //                 ${renderForecast(daily)}
// // // // //             </div>
// // // // //         </section>
// // // // //     `;
// // // // // }



// // // // // async function initApp() {
// // // // //     const coords = await getCoordinates();
// // // // //     // Una vez tenemos las coordenadas (reales o por defecto), cargamos el clima
// // // // //     displayWeather(coords.lat, coords.lon);
// // // // // }

// // // // // // Reemplazamos el antiguo displayWeather() por:
// // // // // initApp();
// // // // // /* Octava parte creo codigos tiempo
// // // // // le falta esta parte pero si solo la añado no funciona porque el link al api no sse lo pide
// // // // // <p><strong>Dirección:</strong> ${wind_direction_10m}°</p>
// // // // // */


// // // // // /*
// // // // // Esta es una excelente mejora de Clean Code y experiencia de usuario. Para lograrlo, usaremos la API nativa del navegador navigator.geolocation, que es gratuita y no requiere librerías externas.

// // // // // La clave aquí es que fetchWeather ahora debe ser flexible y aceptar latitud y longitud como parámetros.

// // // // // 1. Variables de configuración (Clean Code)
// // // // // Primero, definimos nuestra ubicación por defecto (Temple, Coruña) al principio del archivo.

// // // // // JavaScript
// // // // // const DEFAULT_LOCATION = { lat: 43.3713, lon: -8.396 };
// // // // // 2. Función fetchWeather Refactorizada
// // // // // Ahora la función no tiene la URL "fija", sino que la construye dinámicamente:

// // // // // JavaScript
// // // // // async function fetchWeather(lat, lon) {
// // // // //     // Usamos Template Literals para insertar las coordenadas
// // // // //     const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    
// // // // //     try {
// // // // //         const response = await fetch(url);
// // // // //         return response.ok ? await response.json() : null;
// // // // //     } catch (error) {
// // // // //         console.error("Error en la petición:", error);
// // // // //         return null;
// // // // //     }
// // // // // }
// // // // // 3. La lógica de Geolocalización
// // // // // Para evitar el if-else anidado, crearemos una función que nos devuelva las coordenadas. Usaremos una Promesa para que el flujo de la app espere a que el usuario acepte o rechace el permiso.

// // // // // JavaScript
// // // // // function getCoordinates() {
// // // // //     return new Promise((resolve) => {
// // // // //         // Si el navegador no soporta geo o el usuario deniega, devolvemos la posición por defecto
// // // // //         if (!navigator.geolocation) {
// // // // //             resolve(DEFAULT_LOCATION);
// // // // //             return;
// // // // //         }

// // // // //         navigator.geolocation.getCurrentPosition(
// // // // //             (position) => {
// // // // //                 resolve({
// // // // //                     lat: position.coords.latitude,
// // // // //                     lon: position.coords.longitude
// // // // //                 });
// // // // //             },
// // // // //             () => resolve(DEFAULT_LOCATION) // Si hay error (denegado), resolvemos con la por defecto
// // // // //         );
// // // // //     });
// // // // // }
// // // // // 4. Función de inicio initApp
// // // // // Para que el código sea limpio, creamos una función que arranque todo el proceso.

// // // // // JavaScript
// // // // // async function initApp() {
// // // // //     const coords = await getCoordinates();
// // // // //     // Una vez tenemos las coordenadas (reales o por defecto), cargamos el clima
// // // // //     displayWeather(coords.lat, coords.lon);
// // // // // }

// // // // // // Reemplazamos el antiguo displayWeather() por:
// // // // // initApp();
// // // // // 5. Ajuste en displayWeather
// // // // // Simplemente añadimos los parámetros al inicio:

// // // // // JavaScript
// // // // // async function displayWeather(lat, lon) {
// // // // //     const mainContainer = document.querySelector(".mainContainer");
// // // // //     const data = await fetchWeather(lat, lon);
    
// // // // //     // El resto del código que ya tienes permanece igual...
// // // // //     // Usando 'data.current', 'renderForecast(data.daily)', etc.
// // // // // }
// // // // // ¿Por qué esto es Clean Code?
// // // // // Responsabilidad Única (SRP):

// // // // // getCoordinates: Solo se encarga de saber dónde está el usuario.

// // // // // fetchWeather: Solo se encarga de hablar con Open-Meteo.

// // // // // displayWeather: Solo se encarga de pintar en el HTML.

// // // // // Desacoplamiento: La función de clima ya no depende de una ubicación fija; ahora puede pintar el tiempo de cualquier lugar del mundo si le pasas las coordenadas.

// // // // // Manejo de errores silencioso: Si el usuario pulsa "Bloquear" en el permiso de ubicación, la app no se rompe ni lanza errores feos, simplemente carga la ubicación por defecto de forma fluida.

// // // // // ¿Quieres que probemos a añadir el nombre de la ciudad? Como no queremos usar otras APIs, podemos intentar extraer la zona horaria de Open-Meteo (que suele decir algo como "Europe/Madrid") para dar una pista de dónde estamos.
// // // // // */

// // // // // 1. Configuración y Constantes
// // // // const DEFAULT_LOCATION = { lat: 43.3713, lon: -8.396 };

// // // // const weatherIcons = {
// // // //     0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
// // // //     45: "🌫️", 48: "🌫️", 51: "🌦️", 53: "🌦️", 55: "🌦️",
// // // //     61: "🌧️", 63: "🌧️", 65: "🌧️", 71: "❄️", 73: "❄️", 75: "❄️",
// // // //     80: "🌦️", 81: "🌦️", 82: "🌧️", 95: "⛈️"
// // // // };

// // // // // 2. Funciones de Apoyo (Helpers)
// // // // const getWeatherIcon = (code) => weatherIcons[code] || "🌡️";

// // // // function getWeatherMessage(temp) {
// // // //     if (temp < 10) return "¡Abrígate bien, hace frío!";
// // // //     if (temp <= 20) return "El tiempo está agradable.";
// // // //     return "¡Qué calor! Hidrátate.";
// // // // }

// // // // // 3. Lógica de Localización
// // // // function getCoordinates() {
// // // //     return new Promise((resolve) => {
// // // //         if (!navigator.geolocation) return resolve(DEFAULT_LOCATION);
        
// // // //         navigator.geolocation.getCurrentPosition(
// // // //             (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
// // // //             () => resolve(DEFAULT_LOCATION)
// // // //         );
// // // //     });
// // // // }

// // // // // 4. Petición a la API (URL dinámica)
// // // // async function fetchWeather(lat, lon) {
// // // //     // La URL se construye AQUÍ dentro para usar lat y lon correctamente
// // // //     const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    
// // // //     try {
// // // //         const response = await fetch(url);
// // // //         return response.ok ? await response.json() : null;
// // // //     } catch (error) {
// // // //         console.error("Error al consultar API:", error);
// // // //         return null;
// // // //     }
// // // // }

// // // // // 5. Renderizado de Pronóstico
// // // // function renderForecast(daily = {}) {
// // // //     if (!daily.time) return "";
    
// // // //     return daily.time.map((date, index) => {
// // // //         const dayName = new Date(date).toLocaleDateString('es-ES', { weekday: 'short' });
// // // //         return `
// // // //             <div class="forecast-item">
// // // //                 <p class="day-name">${dayName}</p>
// // // //                 <span class="forecast-icon">${getWeatherIcon(daily.weather_code[index])}</span>
// // // //                 <div class="forecast-temps">
// // // //                     <span class="max">${Math.round(daily.temperature_2m_max[index])}º</span>
// // // //                     <span class="min">${Math.round(daily.temperature_2m_min[index])}º</span>
// // // //                 </div>
// // // //             </div>
// // // //         `;
// // // //     }).join('');
// // // // }

// // // // // 6. Función Principal de Interfaz
// // // // async function displayWeather(lat, lon) {
// // // //     const mainContainer = document.querySelector(".mainContainer");
// // // //     const data = await fetchWeather(lat, lon);

// // // //     if (!data) {
// // // //         mainContainer.innerHTML = "<p>Error al obtener datos del servidor.</p>";
// // // //         return;
// // // //     }

// // // //     const { temperature_2m: temp, relative_humidity_2m: hum, wind_speed_10m: wind, wind_direction_10m: dir, uv_index: uv, is_day, weather_code: code } = data.current;
    
// // // //     document.body.className = is_day ? "day-mode" : "night-mode";

// // // //     mainContainer.innerHTML = `
// // // //         <section class="glass-card">
// // // //             <div id="actualWeather">
// // // //                 <span class="main-icon">${getWeatherIcon(code)}</span>
// // // //                 <h2>${Math.round(temp)}º</h2>
// // // //                 <p>${data.timezone.split('/')[1] || 'Ubicación actual'}</p>
// // // //                 <p class="recommendation"><strong>${getWeatherMessage(temp)}</strong></p>
// // // //             </div>

// // // //             <div class="details">
// // // //                 <p><strong>Humedad:</strong> ${hum}%</p>
// // // //                 <p><strong>Viento:</strong> ${wind} km/h</p>
// // // //                 <p><strong>Dirección:</strong> ${dir}°</p>
// // // //                 <p><strong>Índice UV:</strong> ${uv}</p>
// // // //             </div>

// // // //             <div class="forecast-container">
// // // //                 ${renderForecast(data.daily)}
// // // //             </div>
// // // //         </section>
// // // //     `;
// // // // }

// // // // // 7. Inicio de la App
// // // // async function initApp() {
// // // //     const { lat, lon } = await getCoordinates();
// // // //     displayWeather(lat, lon);
// // // // }

// // // // initApp();
// // // // ¿Por qué fallaba y qué hemos arreglado?
// // // // Template Literals mal usados: Tenías ${lat} en una cadena de texto fuera de la función. Las variables lat y lon solo existen cuando el navegador nos las da. He movido la URL dentro de fetchWeather.

// // // // Limpieza de comentarios: Tenías varias definiciones de displayWeather y fetchWeather una debajo de otra. El navegador se confunde o usa siempre la última versión que encuentra.

// // // // Extracción de Ciudad: He añadido ${data.timezone.split('/')[1]}. Esto toma la zona horaria (ej: "Europe/Madrid") y escribe solo "Madrid", así no dice siempre "Temple" si el usuario está en otro sitio.

// // // // Parámetros en displayWeather: Ahora la función acepta lat y lon, y se los pasa correctamente al fetch.

// // // // Siguiente paso: Con esto el código debería ser 100% funcional. ¿Te gustaría que probáramos a añadir una pequeña animación de carga (un spinner) para que el usuario sepa que la app está buscando su posición?

// // // // 1. Configuración y Constantes
// // // const DEFAULT_LOCATION = { lat: 43.3713, lon: -8.396 };

// // // async function searchCity(query) {
// // //     if (query.length < 3) return; // No buscamos si hay menos de 3 letras

// // //     const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=es&format=json`;
    
// // //     try {
// // //         const response = await fetch(url);
// // //         const data = await response.json();
// // //         return data.results || []; // Retorna array de ciudades o vacío
// // //     } catch (error) {
// // //         console.error("Error en el buscador:", error);
// // //         return [];
// // //     }
// // // }

// // // // Función para pintar los resultados de búsqueda
// // // function renderSearchResults(results) {
// // //     const resultsContainer = document.getElementById("searchResults");
    
// // //     if (results.length === 0) {
// // //         resultsContainer.innerHTML = "<p>No se encontraron ciudades</p>";
// // //         return;
// // //     }

// // //     resultsContainer.innerHTML = results.map(city => `
// // //         <div class="search-item" onclick="selectCity(${city.latitude}, ${city.longitude}, '${city.name}')">
// // //             <strong>${city.name}</strong>, ${city.admin1 || ''} (${city.country})
// // //         </div>
// // //     `).join('');
// // // }

// // // // Lo que ocurre al hacer clic en una ciudad buscada
// // // function selectCity(lat, lon, name) {
// // //     displayWeather(lat, lon); // Reutilizamos nuestra función estrella
// // //     document.getElementById("cityInput").value = name;
// // //     document.getElementById("searchResults").innerHTML = ""; // Limpiamos buscador
// // // }

// // // const weatherIcons = {
// // //     0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
// // //     45: "🌫️", 48: "🌫️", 51: "🌦️", 53: "🌦️", 55: "🌦️",
// // //     61: "🌧️", 63: "🌧️", 65: "🌧️", 71: "❄️", 73: "❄️", 75: "❄️",
// // //     80: "🌦️", 81: "🌦️", 82: "🌧️", 95: "⛈️"
// // // };

// // // // 2. Funciones de Apoyo (Helpers)
// // // const getWeatherIcon = (code) => weatherIcons[code] || "🌡️";

// // // function getWeatherMessage(temp) {
// // //     if (temp < 10) return "¡Abrígate bien, hace frío!";
// // //     if (temp <= 20) return "El tiempo está agradable.";
// // //     return "¡Qué calor! Hidrátate.";
// // // }

// // // // 10 Codigo para favoritos
// // // const FAVORITES_KEY = 'weather_favs';

// // // const getFavorites = () => JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

// // // const saveFavorite = (name, lat, lon) => {
// // //     const favs = getFavorites();
// // //     // Evitar duplicados por nombre
// // //     if (!favs.some(f => f.name === name)) {
// // //         favs.push({ name, lat, lon });
// // //         localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
// // //     }
// // //     renderFavoritesList();
// // // };

// // // const deleteFavorite = (name) => {
// // //     const favs = getFavorites().filter(f => f.name !== name);
// // //     localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
// // //     renderFavoritesList();
// // // };

// // // function renderFavoritesList() {
// // //     const favContainer = document.getElementById("favoritesList");
// // //     const favs = getFavorites();

// // //     favContainer.innerHTML = favs.map(fav => `
// // //         <div class="fav-item">
// // //             <button onclick="displayWeather(${fav.lat}, ${fav.lon})">${fav.name}</button>
// // //             <span class="delete-fav" onclick="deleteFavorite('${fav.name}')">❌</span>
// // //         </div>
// // //     `).join('');
// // // }

// // // // 3. Lógica de Localización
// // // function getCoordinates() {
// // //     return new Promise((resolve) => {
// // //         if (!navigator.geolocation) return resolve(DEFAULT_LOCATION);
        
// // //         navigator.geolocation.getCurrentPosition(
// // //             (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
// // //             () => resolve(DEFAULT_LOCATION)
// // //         );
// // //     });
// // // }

// // // // 4. Petición a la API (URL dinámica)
// // // async function fetchWeather(lat, lon) {
// // //     // La URL se construye AQUÍ dentro para usar lat y lon correctamente
// // //     const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    
// // //     try {
// // //         const response = await fetch(url);
// // //         return response.ok ? await response.json() : null;
// // //     } catch (error) {
// // //         console.error("Error al consultar API:", error);
// // //         return null;
// // //     }
// // // }

// // // // 5. Renderizado de Pronóstico
// // // function renderForecast(daily = {}) {
// // //     if (!daily.time) return "";
    
// // //     return daily.time.map((date, index) => {
// // //         const dayName = new Date(date).toLocaleDateString('es-ES', { weekday: 'short' });
// // //         return `
// // //             <div class="forecast-item">
// // //                 <p class="day-name">${dayName}</p>
// // //                 <span class="forecast-icon">${getWeatherIcon(daily.weather_code[index])}</span>
// // //                 <div class="forecast-temps">
// // //                     <span class="max">${Math.round(daily.temperature_2m_max[index])}º</span>
// // //                     <span class="min">${Math.round(daily.temperature_2m_min[index])}º</span>
// // //                 </div>
// // //             </div>
// // //         `;
// // //     }).join('');
// // // }

// // // // 6. Función Principal de Interfaz
// // // async function displayWeather(lat, lon, cityName = "Ubicación actual") {
// // //     const mainContainer = document.querySelector(".mainContainer");
// // //     const data = await fetchWeather(lat, lon);

// // //     if (!data) {
// // //         mainContainer.innerHTML = "<p>Error al obtener datos del servidor.</p>";
// // //         return;
// // //     }

// // //     const { temperature_2m: temp, relative_humidity_2m: hum, wind_speed_10m: wind, wind_direction_10m: dir, uv_index: uv, is_day, weather_code: code } = data.current;
    
// // //     document.body.className = is_day ? "day-mode" : "night-mode";

// // // mainContainer.innerHTML = `
// // //         <section class="glass-card">
// // //             <div id="actualWeather">
// // //                 <h2>${Math.round(data.current.temperature_2m)}º</h2>
// // //                 <p>${cityName}</p> </div>
// // //             <button class="btn-fav" onclick="saveFavorite('${cityName}', ${lat}, ${lon})">
// // //                 ⭐ Guardar ${cityName}
// // //             </button>
// // //             <div class="details">
// // //                 <p><strong>Humedad:</strong> ${hum}%</p>
// // //                 <p><strong>Viento:</strong> ${wind} km/h</p>
// // //                 <p><strong>Dirección:</strong> ${dir}°</p>
// // //                 <p><strong>Índice UV:</strong> ${uv}</p>
// // //             </div>

// // //             <div class="forecast-container">
// // //                 ${renderForecast(data.daily)}
// // //             </div>
// // //         </section>
// // //     `;

// // //     const cityName = data.timezone.split('/')[1] || "Ubicación";
    
// // //     const favButton = document.createElement("button");
// // //     favButton.innerText = "⭐ Guardar en favoritos";
// // //     favButton.className = "btn-fav";
// // //     favButton.onclick = () => saveFavorite(cityName, lat, lon);
    
// // //     mainContainer.appendChild(favButton);
// // // }

// // // document.getElementById("cityInput").addEventListener("input", async (e) => {
// // //     const query = e.target.value;
// // //     const cities = await searchCity(query);
// // //     if (cities) renderSearchResults(cities);
// // // });

// // // // 7. Inicio de la App
// // // async function initApp() {
// // //     const { lat, lon } = await getCoordinates();
// // //     displayWeather(lat, lon);
// // // }

// // // initApp();

// // // // Esto deberia arreglar el problema del bucle infinito
// // // // A. El concepto de "Debouncing" (Antirrebote)
// // // // Por qué fallaba: Si tu buscador dispara una petición a la API por cada letra que escribes, y escribes "Barcelona" rápido, lanzas 9 peticiones en 1 segundo. Si la API es lenta o te bloquea, el código puede entrar en un estado de caos o superar el límite de peticiones (Rate Limit).

// // // // La solución: Esperar a que el usuario deje de escribir durante 300-500ms antes de disparar la API.

// // // // B. El concepto de "Try...Catch" y "Throw" (Control de Excepciones)
// // // // Mencionaste throw. Esto se usa para detener la ejecución cuando algo no tiene sentido y evitar que el error se propague y rompa toda la app (lo que a veces causa esos bucles de re-renderizado).

// // // // Ejemplo de protección real:

// // // // JavaScript
// // // // async function fetchWeather(lat, lon) {
// // // //     try {
// // // //         const response = await fetch(url);
        
// // // //         if (!response.ok) {
// // // //             // "Lanzamos" un error manualmente si la respuesta es 404 o 500
// // // //             throw new Error(`Error de API: ${response.status}`);
// // // //         }
        
// // // //         return await response.json();
// // // //     } catch (error) {
// // // //         // Aquí "atrapamos" el error. 
// // // //         // Evitamos el bucle infinito devolviendo 'null' en lugar de dejar que la app explote.
// // // //         console.error("Fallo crítico:", error.message);
// // // //         return null; 
// // // //     }
// // // // }
// // // // 3. ¿Por qué ocurre un bucle infinito?
// // // // En aplicaciones web, los bucles suelen ocurrir por la "Recursión Descontrolada":

// // // // Tu app carga -> Llama a una función.

// // // // La función falla -> Intenta "recargar" para arreglarlo.

// // // // La recarga vuelve a fallar -> Intenta recargar... (Bucle).

// // // // Para evitarlo: Nunca llames a initApp() o displayWeather() dentro de un bloque catch sin una condición de salida clara.

// // // // Código del Buscador Protegido (Con Debounce)
// // // // Sustituye tu evento del buscador por este. Es mucho más seguro:

// // // // JavaScript
// // // // let timer; // Variable para el temporizador

// // // // document.getElementById("cityInput").addEventListener("input", (e) => {
// // // //     const query = e.target.value;
    
// // // //     // Limpiamos el temporizador anterior cada vez que el usuario teclea
// // // //     clearTimeout(timer);

// // // //     // Solo disparamos la búsqueda si el usuario para de escribir 500ms
// // // //     timer = setTimeout(async () => {
// // // //         if (query.length < 3) return;
// // // //         const cities = await searchCity(query);
// // // //         renderSearchResults(cities);
// // // //     }, 500); 
// // // // });

// // // El motivo por el que aparece "Tu ubicación" es que la Geolocalización del navegador solo nos da números (latitud y longitud), pero no el nombre de la ciudad. Para obtener el nombre real al arrancar, tenemos dos opciones: usar la zona horaria (que ya vimos que es imprecisa) o usar un proceso llamado Geocodificación Inversa.

// // // Dado que ya estamos usando la API de Open-Meteo, podemos aprovechar su buscador para "adivinar" el nombre de tus coordenadas actuales al iniciar.

// // // Aquí tienes el ajuste para tu función initApp:

// // // 1. El ajuste en initApp (Geocodificación inversa)
// // // Sustituye tu función initApp actual por esta. Lo que hace es pedirle a la API de búsqueda que nos diga qué ciudad hay en esas coordenadas:

// // // JavaScript
// // // async function initApp() {
// // //     renderFavoritesList();
// // //     const { lat, lon } = await getCoordinates();
    
// // //     // Intentamos obtener el nombre de la ciudad basado en las coordenadas
// // //     let nameForInit = "Tu ubicación";
// // //     try {
// // //         // Buscamos en la API de geocodificación usando las coordenadas obtenidas
// // //         const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${lat},${lon}&count=1&language=es&format=json`);
// // //         const data = await response.json();
// // //         if (data.results && data.results[0]) {
// // //             nameForInit = data.results[0].name;
// // //         }
// // //     } catch (error) {
// // //         console.warn("No se pudo obtener el nombre de la ciudad inicial:", error);
// // //     }

// // //     displayWeather(lat, lon, nameForInit);
// // // }
// // // 2. ¿Por qué es mejor así?
// // // Al usar este método, el flujo de datos es mucho más coherente:

// // // Navegador: "Estás en 43.37, -8.39".

// // // Geocoding API: "Esas coordenadas corresponden a A Coruña".

// // // DisplayWeather: Pinta el tiempo y pone el nombre correcto.

// // // Favoritos: Si pulsas "Guardar", se guardará como "A Coruña" y no como "Tu ubicación".

// // // Un detalle de Clean Code sobre cityName
// // // Asegúrate de que en tu función displayWeather el parámetro tenga ese valor por defecto solo por seguridad, pero ahora initApp siempre intentará enviarle algo mejor:

// // // JavaScript
// // // async function displayWeather(lat, lon, cityName = "Ubicación desconocida") {
// // //     // ... tu código actual ...
// // // }
// // // El concepto detrás: Geocodificación Inversa
// // // En el desarrollo de APIs, este concepto es el opuesto al buscador que hicimos antes.

// // // Geocoding: Nombre → Coordenadas.

// // // Reverse Geocoding: Coordenadas → Nombre.

// // // ¿Te funciona ahora? Al recargar (y tras aceptar el permiso de ubicación), debería aparecer el nombre de tu municipio o ciudad vecina más cercana registrada en la base de datos de Open-Meteo.


// // const DEFAULT_LOCATION = { lat: 43.3713, lon: -8.396 };
// // const FAVORITES_KEY = 'weather_favs';
// // let searchTimer;

// // const weatherIcons = {
// //     0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
// //     45: "🌫️", 48: "🌫️", 51: "🌦️", 53: "🌦️", 55: "🌦️",
// //     61: "🌧️", 63: "🌧️", 65: "🌧️", 71: "❄️", 73: "❄️", 75: "❄️",
// //     80: "🌦️", 81: "🌦️", 82: "🌧️", 95: "⛈️"
// // };

// // // --- HELPERS ---
// // const getWeatherIcon = (code) => weatherIcons[code] || "🌡️";

// // function getWeatherMessage(temp) {
// //     if (temp < 10) return "¡Abrígate bien, hace frío!";
// //     if (temp <= 20) return "El tiempo está agradable.";
// //     return "¡Qué calor! Hidrátate.";
// // }

// // // --- LOCAL STORAGE ---
// // const getFavorites = () => JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

// // function saveFavorite(name, lat, lon) {
// //     const favs = getFavorites();
// //     if (!favs.some(f => f.name === name)) {
// //         favs.push({ name, lat, lon });
// //         localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
// //         renderFavoritesList();
// //     }
// // }

// // function deleteFavorite(name) {
// //     const favs = getFavorites().filter(f => f.name !== name);
// //     localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
// //     renderFavoritesList();
// // }

// // function renderFavoritesList() {
// //     const favContainer = document.getElementById("favoritesList");
// //     if (!favContainer) return;
// //     const favs = getFavorites();

// //     favContainer.innerHTML = favs.map(fav => `
// //         <div class="fav-item">
// //             <button onclick="displayWeather(${fav.lat}, ${fav.lon}, '${fav.name}')">${fav.name}</button>
// //             <span class="delete-fav" onclick="deleteFavorite('${fav.name}')">❌</span>
// //         </div>
// //     `).join('');
// // }

// // // --- API & LOCATION ---
// // async function fetchWeather(lat, lon) {
// //     const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
// //     try {
// //         const response = await fetch(url);
// //         if (!response.ok) throw new Error("Error en la respuesta de la API");
// //         return await response.json();
// //     } catch (error) {
// //         console.error("Fallo en fetchWeather:", error);
// //         return null;
// //     }
// // }

// // async function searchCity(query) {
// //     if (query.length < 3) return [];
// //     const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=es&format=json`;
// //     try {
// //         const response = await fetch(url);
// //         const data = await response.json();
// //         return data.results || [];
// //     } catch (error) {
// //         return [];
// //     }
// // }

// // function getCoordinates() {
// //     return new Promise((resolve) => {
// //         if (!navigator.geolocation) return resolve(DEFAULT_LOCATION);
// //         navigator.geolocation.getCurrentPosition(
// //             (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
// //             () => resolve(DEFAULT_LOCATION)
// //         );
// //     });
// // }

// // // --- INTERFAZ ---
// // function renderForecast(daily = {}) {
// //     if (!daily.time) return "";
// //     return daily.time.map((date, index) => {
// //         const dayName = new Date(date).toLocaleDateString('es-ES', { weekday: 'short' });
// //         return `
// //             <div class="forecast-item">
// //                 <p class="day-name">${dayName}</p>
// //                 <span class="forecast-icon">${getWeatherIcon(daily.weather_code[index])}</span>
// //                 <div class="forecast-temps">
// //                     <span class="max">${Math.round(daily.temperature_2m_max[index])}º</span>
// //                     <span class="min">${Math.round(daily.temperature_2m_min[index])}º</span>
// //                 </div>
// //             </div>
// //         `;
// //     }).join('');
// // }

// // async function displayWeather(lat, lon, cityName = "Ubicación desconocida") {
// //     const mainContainer = document.querySelector(".mainContainer");
// //     const data = await fetchWeather(lat, lon);

// //     if (!data) {
// //         mainContainer.innerHTML = "<p>Error al conectar con el servidor.</p>";
// //         return;
// //     }

// //     const { temperature_2m: temp, relative_humidity_2m: hum, wind_speed_10m: wind, wind_direction_10m: dir, uv_index: uv, is_day, weather_code: code } = data.current;
    
// //     document.body.className = is_day ? "day-mode" : "night-mode";

// //     mainContainer.innerHTML = `
// //         <section class="glass-card">
// //             <div id="actualWeather">
// //                 <span class="main-icon">${getWeatherIcon(code)}</span>
// //                 <h2>${Math.round(temp)}º</h2>
// //                 <p>${cityName}</p>
// //                 <p class="recommendation"><strong>${getWeatherMessage(temp)}</strong></p>
// //             </div>
            
// //             <button class="btn-fav" onclick="saveFavorite('${cityName}', ${lat}, ${lon})">
// //                 ⭐ Guardar en favoritos
// //             </button>

// //             <div class="details">
// //                 <p><strong>Humedad:</strong> ${hum}%</p>
// //                 <p><strong>Viento:</strong> ${wind} km/h</p>
// //                 <p><strong>Dirección:</strong> ${dir}°</p>
// //                 <p><strong>Índice UV:</strong> ${uv}</p>
// //             </div>

// //             <div class="forecast-container">
// //                 ${renderForecast(data.daily)}
// //             </div>
// //         </section>
// //     `;
// // }

// // function selectCity(lat, lon, name) {
// //     displayWeather(lat, lon, name);
// //     document.getElementById("cityInput").value = name;
// //     document.getElementById("searchResults").innerHTML = "";
// // }

// // function renderSearchResults(results) {
// //     const resultsContainer = document.getElementById("searchResults");
// //     resultsContainer.innerHTML = results.map(city => `
// //         <div class="search-item" onclick="selectCity(${city.latitude}, ${city.longitude}, '${city.name}')">
// //             <strong>${city.name}</strong>, ${city.admin1 || ''} (${city.country})
// //         </div>
// //     `).join('');
// // }

// // // --- EVENTOS & INICIO ---
// // document.getElementById("cityInput").addEventListener("input", (e) => {
// //     clearTimeout(searchTimer);
// //     const query = e.target.value;
// //     searchTimer = setTimeout(async () => {
// //         const results = await searchCity(query);
// //         renderSearchResults(results);
// //     }, 500);
// // });

// // async function initApp() {
// //     renderFavoritesList();
// //     const { lat, lon } = await getCoordinates();
    
// //     // Intentamos obtener el nombre de la ciudad basado en las coordenadas
// //     let nameForInit = "Tu ubicación";
// //     try {
// //         // Buscamos en la API de geocodificación usando las coordenadas obtenidas
// //         const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${lat},${lon}&count=1&language=es&format=json`);
// //         const data = await response.json();
// //         if (data.results && data.results[0]) {
// //             nameForInit = data.results[0].name;
// //         }
// //     } catch (error) {
// //         console.warn("No se pudo obtener el nombre de la ciudad inicial:", error);
// //     }

// //     displayWeather(lat, lon, nameForInit);
// // }

// // initApp();

// // // --- MODIFICACIÓN EN DISPLAYWEATHER ---
// // async function displayWeather(lat, lon, cityName = null) {
// //     const mainContainer = document.querySelector(".mainContainer");
// //     const data = await fetchWeather(lat, lon);

// //     if (!data) {
// //         mainContainer.innerHTML = "<p>Error al conectar con el servidor.</p>";
// //         return;
// //     }

// //     // LÓGICA DE NOMBRE: 
// //     // 1. Si cityName existe (viene de buscador/favorito), lo usamos.
// //     // 2. Si es null (viene de initApp), limpiamos el timezone (ej: "Madrid")
// //     const finalCityName = cityName || data.timezone.split('/').pop().replace('_', ' ');

// //     const { temperature_2m: temp, relative_humidity_2m: hum, wind_speed_10m: wind, wind_direction_10m: dir, uv_index: uv, is_day, weather_code: code } = data.current;
    
// //     document.body.className = is_day ? "day-mode" : "night-mode";

// //     mainContainer.innerHTML = `
// //         <section class="glass-card">
// //             <div id="actualWeather">
// //                 <span class="main-icon">${getWeatherIcon(code)}</span>
// //                 <h2>${Math.round(temp)}º</h2>
// //                 <p>${finalCityName}</p>
// //                 <p class="recommendation"><strong>${getWeatherMessage(temp)}</strong></p>
// //             </div>
            
// //             <button class="btn-fav" onclick="saveFavorite('${finalCityName}', ${lat}, ${lon})">
// //                 ⭐ Guardar en favoritos
// //             </button>

// //             <div class="details">
// //                 <p><strong>Humedad:</strong> ${hum}%</p>
// //                 <p><strong>Viento:</strong> ${wind} km/h</p>
// //                 <p><strong>Dirección:</strong> ${dir}°</p>
// //                 <p><strong>Índice UV:</strong> ${uv}</p>
// //             </div>

// //             <div class="forecast-container">
// //                 ${renderForecast(data.daily)}
// //             </div>
// //         </section>
// //     `;
// // }

// async function displayWeather(lat, lon, cityName = null) {
//     const mainContainer = document.querySelector(".mainContainer");
//     const data = await fetchWeather(lat, lon);

//     // Si la API falla, mostramos error y salimos para evitar bloqueos
//     if (!data) {
//         mainContainer.innerHTML = "<p>Error al conectar con el servidor. Reintenta en unos momentos.</p>";
//         return;
//     }

//     // Lógica segura para el nombre: 
//     // Si no viene nombre (cityName), usamos el timezone (Madrid, London, etc.)
//     // Si falla el timezone, ponemos un texto genérico.
//     const finalCityName = cityName || (data.timezone ? data.timezone.split('/').pop().replace('_', ' ') : "Ubicación");

//     const { temperature_2m: temp, relative_humidity_2m: hum, wind_speed_10m: wind, wind_direction_10m: dir, uv_index: uv, is_day, weather_code: code } = data.current;
    
//     document.body.className = is_day ? "day-mode" : "night-mode";

//     mainContainer.innerHTML = `
//         <section class="glass-card">
//             <div id="actualWeather">
//                 <span class="main-icon">${getWeatherIcon(code)}</span>
//                 <h2>${Math.round(temp)}º</h2>
//                 <p>${finalCityName}</p>
//                 <p class="recommendation"><strong>${getWeatherMessage(temp)}</strong></p>
//             </div>
            
//             <button class="btn-fav" onclick="saveFavorite('${finalCityName}', ${lat}, ${lon})">
//                 ⭐ Guardar en favoritos
//             </button>

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

// // // --- MODIFICACIÓN EN INITAPP ---
// // async function initApp() {
// //     renderFavoritesList();
// //     const { lat, lon } = await getCoordinates();
    
// //     // Simplemente llamamos a displayWeather. 
// //     // Al no pasarle el tercer parámetro, usará la lógica del timezone que pusimos arriba.
// //     displayWeather(lat, lon);
// // }

// async function initApp() {
//     renderFavoritesList();
//     const coords = await getCoordinates();
//     // Pasamos lat y lon. cityName se queda como null y entrará en la lógica de arriba
//     displayWeather(coords.lat, coords.lon);
// }

// initApp();

// 1. CONSTANTES Y CONFIGURACIÓN
const DEFAULT_LOCATION = { lat: 43.3713, lon: -8.396 };
const FAVORITES_KEY = 'weather_favs';
let searchTimer;

const weatherIcons = {
    0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
    45: "🌫️", 48: "🌫️", 51: "🌦️", 53: "🌦️", 55: "🌦️",
    61: "🌧️", 63: "🌧️", 65: "🌧️", 71: "❄️", 73: "❄️", 75: "❄️",
    80: "🌦️", 81: "🌦️", 82: "🌧️", 95: "⛈️"
};

async function getCityNameFromCoords(lat, lon) {
    try {
        // Usamos la API de geocodificación pero pasándole las coordenadas en el parámetro 'name'
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${lat},${lon}&count=1&language=es&format=json`);
        const data = await response.json();
        
        // Si la API encuentra un resultado exacto para esas coordenadas, nos dará el nombre
        if (data.results && data.results[0]) {
            return data.results[0].name;
        }
        return null;
    } catch (error) {
        console.warn("No se pudo recuperar el nombre exacto:", error);
        return null;
    }
}

// 2. GESTIÓN DE FAVORITOS (LocalStorage)
const getFavorites = () => JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

function renderFavoritesList() {
    const favContainer = document.getElementById("favoritesList");
    if (!favContainer) return;
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

// 3. FUNCIONES DE APOYO Y API
const getWeatherIcon = (code) => weatherIcons[code] || "🌡️";

function getWeatherMessage(temp) {
    if (temp < 10) return "¡Abrígate bien, hace frío!";
    if (temp <= 20) return "El tiempo está agradable.";
    return "¡Qué calor! Hidrátate.";
}

async function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    try {
        const response = await fetch(url);
        return response.ok ? await response.json() : null;
    } catch (error) {
        return null;
    }
}

// 4. LÓGICA DE INTERFAZ
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

async function displayWeather(lat, lon, cityName = null) {
    const mainContainer = document.querySelector(".mainContainer");
    const data = await fetchWeather(lat, lon);

    if (!data) {
        mainContainer.innerHTML = "<p>Error al cargar el clima.</p>";
        return;
    }

    const finalCityName = cityName || (data.timezone ? data.timezone.split('/').pop().replace('_', ' ') : "Ubicación");
    const { temperature_2m: temp, relative_humidity_2m: hum, wind_speed_10m: wind, uv_index: uv, is_day, weather_code: code } = data.current;
    
    document.body.className = is_day ? "day-mode" : "night-mode";

    mainContainer.innerHTML = `
        <section class="glass-card">
            <div id="actualWeather">
                <span class="main-icon">${getWeatherIcon(code)}</span>
                <h2>${Math.round(temp)}º</h2>
                <p>${finalCityName}</p>
                <p class="recommendation"><strong>${getWeatherMessage(temp)}</strong></p>
            </div>
            
            <button class="btn-fav" onclick="saveFavorite('${finalCityName}', ${lat}, ${lon})">
                ⭐ Guardar en favoritos
            </button>

            <div class="details">
                <p><strong>Humedad:</strong> ${hum}% | <strong>Viento:</strong> ${wind} km/h</p>
                <p><strong>Índice UV:</strong> ${uv}</p>
            </div>

            <div class="forecast-container">
                ${renderForecast(data.daily)}
            </div>
        </section>
    `;
}

// 5. BUSCADOR Y GEOLOCALIZACIÓN
async function searchCity(query) {
    if (query.length < 3) return [];
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=es&format=json`);
        const data = await response.json();
        return data.results || [];
    } catch (e) { return []; }
}

function selectCity(lat, lon, name) {
    displayWeather(lat, lon, name);
    document.getElementById("cityInput").value = name;
    document.getElementById("searchResults").innerHTML = "";
}

function getCoordinates() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) return resolve(DEFAULT_LOCATION);
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            () => resolve(DEFAULT_LOCATION)
        );
    });
}

// 6. EVENTOS E INICIO
document.getElementById("cityInput")?.addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(async () => {
        const results = await searchCity(e.target.value);
        const resultsContainer = document.getElementById("searchResults");
        resultsContainer.innerHTML = results.map(city => `
            <div class="search-item" onclick="selectCity(${city.latitude}, ${city.longitude}, '${city.name}')">
                <strong>${city.name}</strong> (${city.country})
            </div>
        `).join('');
    }, 500);
});

async function initApp() {
    renderFavoritesList();
    const coords = await getCoordinates();
    
    // PASO NUEVO: Buscamos el nombre real de la ciudad antes de mostrar nada
    const realName = await getCityNameFromCoords(coords.lat, coords.lon);
    
    // Si realName es null, displayWeather usará su lógica por defecto (timezone)
    displayWeather(coords.lat, coords.lon, realName);
}

initApp();