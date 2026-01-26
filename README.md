🌤️ WeatherApp - Mobile First Experience
Una aplicación web moderna y profesional diseñada bajo la filosofía Mobile First, que permite consultar el estado del tiempo en tiempo real utilizando geolocalización automática o búsqueda manual.

🎯 Características Principales
📍 Geolocalización Inteligente: Al iniciar, la app detecta tu ubicación para mostrarte el clima local.

🔍 Buscador de Ciudades: Permite consultar el clima de cualquier parte del mundo mediante la integración de la API de Geocodificación de Open-Meteo.

⭐ Sistema de Favoritos: Guarda tus ciudades frecuentes. Los favoritos son interactivos y se almacenan en el navegador (localStorage) para persistir tras cerrar la página.

📊 Visualización de Datos (Chart.js): Gráfico dinámico que muestra la evolución de la temperatura durante las próximas 24 horas.

🎨 UI Dinámica: El fondo de la aplicación cambia de color automáticamente según el estado del cielo (Soleado, Nublado, Lluvia).

⏳ Experiencia Fluida: Pantalla de carga (Spinner) optimizada para mejorar la percepción del rendimiento.

🛠️ Tecnologías y Metodologías
HTML5 & CSS3: Maquetación semántica y diseño responsivo sin frameworks externos para demostrar control total del CSS.

JavaScript (Vanilla ES6+): Lógica asíncrona, manipulación del DOM y persistencia de datos.

APIs Utilizadas:

Open-Meteo: Datos meteorológicos y geocodificación.

BigDataCloud: Reverse geocoding para nombres de ciudades.

Chart.js: Librería para la renderización del gráfico de tendencia térmica.

Clean Code: Naming descriptivo en camelCase, funciones con responsabilidad única y estructura de carpetas organizada.

🤖 Uso de Inteligencia Artificial
Para este proyecto se ha utilizado Gemini (IA de Google) como asistente de desarrollo:

Lógica del Gráfico: Se consultó a la IA para la configuración óptima de Chart.js en dispositivos móviles, asegurando que el gráfico fuera responsivo y se destruyera correctamente al cambiar de ciudad para evitar fugas de memoria.

Traducción de Códigos WMO: La IA ayudó a mapear los códigos numéricos de Open-Meteo a descripciones en español y emojis.

Persistencia: Se utilizó asistencia para implementar la lógica de guardado y recuperación de la lista de favoritos desde el localStorage.

Optimización CSS: Ayuda en la creación de los gradientes dinámicos y la estructura de scroll horizontal para el pronóstico por horas.

📦 Instalación y Despliegue
Clonar el repositorio:

Bash

git clone https://github.com/TU_USUARIO/TU_REPOSIORIO.git
Navegar a la carpeta:

Bash

cd TU_REPOSIORIO
Ejecución: Simplemente abre el archivo index.html en tu navegador o utiliza la extensión Live Server en VS Code.

GitHub Pages: Puedes ver la versión en vivo aquí: [TU_URL_DE_GITHUB_PAGES]

🌳 Flujo de Trabajo (Git)
Se ha seguido una metodología de Conventional Commits y trabajo por ramas:

main: Rama de producción.

feature/favorites: Implementación del sistema de favoritos.

feature/chart: Integración de los gráficos de temperatura.

feature/search: Lógica del buscador de ciudades.