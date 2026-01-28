---

# Explicación Detallada del Código

## Estructura General

La aplicación está dividida en tres archivos principales:

### 1. **HTML (index.html)**
Define la estructura de la aplicación con:
- **Tarjeta principal**: Muestra clima actual, historial y pronóstico
- **Sidebar**: Ubicación actual, ubicaciones guardadas y estadísticas de caché
- **Modal**: Para buscar y añadir nuevas ubicaciones

### 2. **CSS (style.css)**
Contiene todos los estilos con:
- **Diseño responsive**: Grid layout que se adapta a móviles
- **Animaciones**: Transiciones suaves en hover y efectos visuales
- **Secciones específicas**: Estilos para historial (barras) y pronóstico (tarjetas)

### 3. **JavaScript (app.js)**
El cerebro de la aplicación, dividido en secciones:

---

## Componentes JavaScript Explicados

### **1. Sistema de Caché Avanzado**
```javascript
class CacheAvanzado {
    constructor(opciones = {}) {
        this.cacheMemoria = new Map();  // Caché en RAM (rápido)
        this.prefijo = 'weather_';       // Prefijo para localStorage
        this.tiempoExpiracion = 30 * 60 * 1000;  // 30 minutos
        // ...
    }
}
```

**¿Cómo funciona?**

1. **Doble capa**: Usa memoria RAM (Map) y localStorage
2. **Memoria primero**: Busca en RAM, luego en localStorage
3. **LRU (Least Recently Used)**: Elimina datos menos usados cuando se llena
4. **Expiración automática**: Los datos tienen 30 minutos de vida
5. **Estadísticas**: Registra hits/misses para medir eficiencia

**Flujo de obtención de datos:**
¿Está en memoria RAM?
→ SÍ: Devolver (muy rápido)
→ NO: ¿Está en localStorage?
→ SÍ: Copiar a RAM y devolver (rápido)
→ NO: Consultar API, guardar en ambos (lento)

**Generación de claves:**
```javascript
generarClave(lat, lon, variable, precision = 2) {
    // Redondea a 2 decimales: 40.4168 → 40.42
    // Clave: "40.42,-3.70,temperature_2m"
    // Agrupa puntos cercanos para reutilizar datos
}
```

### **2. Obtención de Datos del Tiempo**
```javascript
async function displayWeather(location) {
    // URL con múltiples parámetros
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?
        latitude=${location.lat}&
        longitude=${location.lon}&
        current=temperature_2m,humidity,...&  // Datos actuales
        daily=temperature_2m_max,...&         // Datos diarios
        past_days=7&                          // Últimos 7 días
        forecast_days=3&                      // Próximos 3 días
        timezone=auto`
    );
}
```

**Parámetros importantes:**
- `current`: Variables meteorológicas del momento actual
- `daily`: Datos agregados por día (máx, mín, suma)
- `past_days=7`: Incluye 7 días históricos
- `forecast_days=3`: Incluye 3 días de pronóstico
- `timezone=auto`: Ajusta automáticamente la zona horaria

**Respuesta de la API:**
```json
{
  "current": { 
    "temperature_2m": 15.2,
    "humidity": 65,
    // ...
  },
  "daily": {
    "time": ["2026-01-19", "2026-01-20", ...],
    "temperature_2m_max": [18, 20, 22, ...],
    "temperature_2m_min": [10, 12, 14, ...],
    // ...
  }
}
```

### **3. Visualización del Historial**
```javascript
function displayHistory(dailyData) {
    // Calcular índices para últimos 7 días
    const totalDias = dailyData.time.length;  // Ej: 10 (7 pasados + 3 futuros)
    const indiceInicio = totalDias - 7 - 3;   // Ej: 0
    const indiceFin = totalDias - 3;           // Ej: 7
    
    // Crear barra para cada día
    for (let i = indiceInicio; i < indiceFin; i++) {
        const tempMedia = (tempMax[i] + tempMin[i]) / 2;
        
        // Calcular altura relativa (0-100%)
        const altura = ((tempMedia - minTemp) / rangoTemp) * 100;
        
        // Crear elemento visual
        bar.style.height = `${altura}%`;
    }
}
```

**¿Cómo se calcula la altura de las barras?**
Ejemplo con temperaturas: 10°, 15°, 20°, 25°, 30°
minTemp = 10°
maxTemp = 30°
rangoTemp = 30 - 10 = 20°
Para 20°:
altura = ((20 - 10) / 20) * 100 = 50%
Para 30°:
altura = ((30 - 10) / 20) * 100 = 100%

Las barras se escalan proporcionalmente para que siempre se vea el rango completo.

### **4. Visualización del Pronóstico**
```javascript
function displayForecast(dailyData) {
    const totalDias = dailyData.time.length;
    const indiceInicio = totalDias - 3;  // Últimos 3 elementos = próximos 3 días
    
    for (let i = indiceInicio; i < totalDias; i++) {
        // Crear tarjeta con:
        // - Día de la semana
        // - Fecha
        // - Icono del tiempo
        // - Temperaturas máx/mín
        // - Probabilidad de lluvia
        // - Velocidad del viento
    }
}
```

**Estructura de cada tarjeta:**
┌─────────────────────┐
│   Lunes            │  ← Día
│   27/1             │  ← Fecha
│   ☀️               │  ← Icono
│   Máx: 25° Mín:15°│  ← Temperaturas
│   Despejado        │  ← Descripción
│   Lluvia: 10%     │  ← Detalles
│   Viento: 15 km/h │
└─────────────────────┘

### **5. Sistema de Geolocalización**
```javascript
function getCurrentLocation() {
    // API del navegador para obtener coordenadas GPS
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            // Convertir coordenadas a nombre de ciudad
            const cityData = await getCityName(lat, lon);
            
            // Guardar como ubicación actual
            currentLocation = {
                name: cityData.name,
                lat: lat,
                lon: lon
            };
        }
    );
}
```

**Flujo:**

Navegador pide permiso al usuario
GPS del dispositivo obtiene coordenadas
Open-Meteo Geocoding API: coordenadas → nombre ciudad
Guardar ubicación y mostrar clima


### **6. Gestión de Ubicaciones Guardadas**
```javascript
function addLocation(location) {
    // Verificar duplicados comparando coordenadas
    const exists = savedLocations.some(
        loc => loc.lat === location.lat && loc.lon === location.lon
    );
    
    if (!exists) {
        savedLocations.push(location);
        localStorage.setItem('weatherAppLocations', JSON.stringify(savedLocations));
    }
}
```

**localStorage para persistencia:**
- Los datos sobreviven al cerrar el navegador
- Se guardan como JSON string
- Límite aprox: 5-10 MB por dominio

### **7. Códigos del Tiempo a Iconos**
```javascript
function getWeatherIcon(code) {
    // WMO Weather codes → Emojis
    const icons = {
        0: '☀️',    // Despejado
        1: '🌤️',   // Mayormente despejado
        2: '⛅',    // Parcialmente nublado
        61: '🌧️',  // Lluvia
        95: '⛈️',   // Tormenta
        // ...
    };
    return icons[code] || '🌡️';
}
```

**Los códigos WMO son estándar internacional** usado por servicios meteorológicos.

### **8. Actualización de Estadísticas del Caché**
```javascript
function updateCacheStats() {
    const stats = cacheClima.estadisticas();
    
    // Mostrar en la UI
    hitRate.textContent = stats.hitRate;        // "75.5%"
    cacheEntries.textContent = stats.entries;   // "42"
    cacheSize.textContent = stats.size;         // "15.2 KB"
}
```

**Hit Rate = (Hits / Total consultas) × 100**
Ejemplo:

100 consultas totales
75 encontradas en caché (hits)
25 consultadas a la API (misses)
Hit Rate = (75/100) × 100 = 75%


Un hit rate alto significa que el caché es efectivo y ahorra muchas peticiones.

---

## Flujo Completo de la Aplicación

Usuario abre la app
↓
Se detecta ubicación GPS
↓
Coordenadas → Nombre de ciudad (Geocoding API)
↓
Se consulta clima actual + historial + pronóstico
↓
Se guarda en caché (memoria + localStorage)
↓
Se renderiza:

Clima actual
Gráfico de barras (últimos 7 días)
3 tarjetas (pronóstico 3 días)
↓


Usuario puede:

Buscar otra ciudad
Guardar ubicaciones
Ver estadísticas del caché
Cambiar entre ubicaciones guardadas




---

## Ventajas de esta Implementación

1. **Rendimiento**: El caché reduce peticiones a la API drásticamente
2. **Experiencia offline**: Con localStorage, funciona parcialmente sin internet
3. **Visual atractivo**: Historial con barras animadas y pronóstico con tarjetas
4. **Datos completos**: Pasado (7 días) + Presente + Futuro (3 días)
5. **Optimización inteligente**: LRU mantiene solo datos relevantes
6. **Transparencia**: Estadísticas muestran eficiencia del sistema

---

## Conceptos Clave para Entender

### **Map vs Object en JavaScript**
```javascript
// Object (tradicional)
const obj = {};
obj['clave'] = 'valor';

// Map (moderno, más eficiente)
const map = new Map();
map.set('clave', 'valor');
map.get('clave');  // 'valor'
```

**Ventajas de Map:**
- Mejor rendimiento con muchas entradas
- Métodos útiles: `.size`, `.has()`, `.clear()`
- Claves pueden ser cualquier tipo (no solo strings)

### **Async/Await**
```javascript
// Esto:
async function obtenerDatos() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Es más legible que esto (callbacks):
function obtenerDatos(callback) {
    fetch(url).then(response => {
        response.json().then(data => {
            callback(data);
        });
    });
}
```

### **Template Literals**
```javascript
// Interpolación de variables en strings
const nombre = "Madrid";
const temp = 25;

// Antiguo
const mensaje = "En " + nombre + " hace " + temp + "°C";

// Moderno
const mensaje = `En ${nombre} hace ${temp}°C`;
```

¿Hay alguna parte específica que quieras que profundice más?