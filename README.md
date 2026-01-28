🌤️ WeatherApp - Aplicación del Tiempo
<div align="center">
https://img.shields.io/badge/Mobile_First-Design-4CAF50?style=for-the-badge
https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript
https://img.shields.io/badge/API-Open--Meteo-0088CC?style=for-the-badge

Una aplicación web moderna para consultar el estado del tiempo en tiempo real, diseñada con filosofía Mobile First.

🌐 Demo en vivo • 🐛 Reportar bug • 💡 Solicitar feature

</div>
📱 Vista Previa
<div align="center"> <img src="screenshot-mobile.png" alt="Vista móvil" width="300" /> <img src="screenshot-desktop.png" alt="Vista escritorio" width="500" /> </div>
✨ Características Principales
🌍 Geolocalización Inteligente
Detección automática de tu ubicación al iniciar

Nombre real de la ciudad mediante Geocodificación Inversa

Permiso de ubicación con feedback claro al usuario

🔍 Búsqueda Avanzada
Busca cualquier ciudad del mundo

Autocompletado con sugerencias (opcional)

Historial de búsquedas recientes

⭐ Sistema de Favoritos
Guarda tus ciudades más consultadas

Almacenamiento persistente con localStorage

Acceso rápido con un solo clic

Temperaturas actualizadas automáticamente

📊 Visualización de Datos
Clima actual completo: Temperatura, humedad, viento, sensación térmica

Pronóstico de 7 días: Máximas y mínimas con íconos descriptivos

Diseño responsive: Se adapta a todos los dispositivos

🎨 Interfaz Dinámica
Fondo que cambia según las condiciones climáticas

Íconos animados y descriptivos

Transiciones suaves entre vistas

Modo claro/oscuro según preferencia del sistema

⚡ Experiencia Optimizada
Pantalla de carga con skeleton screens

Cache inteligente de búsquedas

Offline básico con Service Workers

Rendimiento optimizado (Lighthouse > 90)

🛠️ Tecnologías Utilizadas
Tecnología	Uso	Versión
HTML5	Estructura semántica y accesible	ES6+
CSS3	Estilos con variables, Flexbox, Grid	Custom Properties
JavaScript	Lógica de la aplicación	ES6+ Modules
Open-Meteo API	Datos meteorológicos	v1.4
Font Awesome	Íconos y elementos visuales	6.4.0
LocalStorage	Persistencia de datos en cliente	nativo
📁 Estructura del Proyecto
text
weatherapp/
├── index.html          # Punto de entrada principal
├── style.css          # Estilos principales (BEM methodology)
├── app.js            # Lógica de la aplicación
├── assets/           # Recursos estáticos
│   ├── icons/        # Íconos y SVG
│   ├── screenshots/  # Capturas para README
│   └── favicon/      # Favicons y manifest
├── service-worker.js # Para funcionalidad offline
└── README.md         # Este archivo
🚀 Instalación y Uso
Opción 1: Usar la versión en línea
Simplemente visita: https://tudominio.github.io/weatherapp

Opción 2: Ejecutar localmente
bash
# 1. Clonar el repositorio
git clone https://github.com/tuusuario/weatherapp.git

# 2. Navegar al directorio
cd weatherapp

# 3. Instalar dependencias (si las hay)
# No se requieren dependencias - es vanilla JS

# 4. Ejecutar con un servidor local
# Opción A: Con Python
python3 -m http.server 8000

# Opción B: Con Node.js (si tienes http-server)
npx http-server

# Opción C: Con PHP
php -S localhost:8000

# 5. Abrir en navegador
# Visita http://localhost:8000
Opción 3: Usar VS Code Live Server
Abre el proyecto en VS Code

Instala la extensión "Live Server"

Haz clic derecho en index.html → "Open with Live Server"

📖 Guía de Uso
Primeros Pasos
Al iniciar: La app pedirá permiso para acceder a tu ubicación

Permitir ubicación: Verás automáticamente el clima de tu ciudad

Denegar ubicación: Puedes buscar manualmente cualquier ciudad

Funcionalidades Avanzadas
🔍 Buscar una Ciudad
javascript
// Ejemplos de búsqueda:
// - "Madrid, España"
// - "New York"
// - "Tokyo"
// - "Buenos Aires"
⭐ Gestión de Favoritos
Añadir: Haz clic en la estrella en cualquier ciudad

Eliminar: Haz clic en 🗑️ en la lista de favoritos

Cargar: Haz clic en 🔍 junto a cualquier favorito

📊 Interpretación de Datos
Temperatura: Mostrada en °C (configurable)

Íconos: Representan las condiciones actuales

Colores: Cambian según la temperatura

🔧 Configuración y Personalización
Variables CSS Principales
css
:root {
    --color-primary: #4f46e5;      /* Color principal */
    --color-secondary: #10b981;    /* Color secundario */
    --temperature-hot: #ef4444;    /* Para temperaturas altas */
    --temperature-cold: #3b82f6;   /* Para temperaturas bajas */
    --border-radius: 12px;         /* Bordes redondeados */
}
Configuración de la API
La app utiliza Open-Meteo por defecto. Para cambiar a otra API:

javascript
// En app.js
const API_CONFIG = {
    BASE_URL: 'https://api.open-meteo.com/v1',
    // Cambia a otra API si lo deseas
    // BASE_URL: 'https://api.weatherapi.com/v1'
};
🤖 Uso de Inteligencia Artificial en el Desarrollo
Este proyecto utilizó Gemini AI como asistente de desarrollo en las siguientes áreas:

🎯 Asistencia Específica
Implementación de Chart.js: Configuración óptima para dispositivos móviles

Traducción de códigos WMO: Mapeo de códigos meteorológicos a español

Lógica de localStorage: Sistema robusto de favoritos

Optimización CSS: Gradientes dinámicos y responsive design

📚 Aprendizajes Clave
Arquitectura modular con separación de responsabilidades

Manejo de errores en peticiones asíncronas

Patrones de diseño como Factory y Singleton

Buenas prácticas en manipulación del DOM

🌳 Flujo de Trabajo Git
Se siguió Conventional Commits y desarrollo por características:
