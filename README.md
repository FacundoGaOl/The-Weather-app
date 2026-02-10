# Mobile Weather App
Es una aplicacion mobile first que muestra el tiempo actual consumiendo los datos de la API deOpen-meteo

## Características
Geolocalización Automática: Detecta tu ubicación actual al iniciar la app mediante la API del navegador.

Búsqueda Inteligente (Debounce): Buscador de ciudades integrado con la API de Geocoding de Open Meteo. Implementa un sistema de retardo (500ms) para evitar llamadas excesivas a la API.

Modo Dinámico Día/Noche: El fondo y los estilos de texto cambian automáticamente basándose en los datos solares reales de la ubicación consultada.

Gestión de Favoritos: Guarda tus ciudades frecuentes. Los datos se mantienen incluso después de cerrar el navegador gracias al uso de LocalStorage.

Pronóstico de 7 días: Visualización clara de las temperaturas máximas (en rojo) y mínimas (en azul) con iconos representativos.

## Arquitectura y enfoque técnico
APIs de Clima: Open-Meteo (Forecast y Geocoding).

Geolocalización Inversa: BigDataCloud para obtener el nombre de la ciudad mediante coordenadas.

Estilos: CSS Moderno con backdrop-filter, Flexbox y transiciones suaves.

Imágenes: Fondos dinámicos curados de Unsplash.

## Tecnologías utilizadas
HTML5
CSS3 
JavaScript 
Git & GitHub 
GitHub Pages 

En una extructura mínima de:
index.html: Estructura semántica del sitio.
style.css: Lógica visual, diseño Glassmorphism y temas día/noche.
app.js: Cerebro de la aplicación. Maneja el estado, las peticiones asíncronas y la persistencia de datos.

## APIs

Open-Meteo Weather API https://open-meteo.com (datos meteorológicos)

## Cómo ejecutar el proyecto en local
Opción recomendada (VS Code)
    Instala la extensión Live Server
    Abre el proyecto en VS Code
    Click derecho sobre index.html → Open with Live Server

## Estado del proyecto

Actualmente está en  dev una version más sencilla que la que se estaba trabajando pero si es funcional, esto lo ampliaré en el apartado de uso de la IA

## Uso de la IA

Uno de los objetivos del ejercicio era el uso de la IA, de varias y poder encontrar que usos practicos podia tener para nuestro flujo de trabajo. 
Hasta ahora habia intentado usarla de forma muy controlada, principalmente para ver porque no funcionaban partes del código. Por ello opté por probar a hacerla directamente, y en varias distintas como se puede ver en las ramas.

Si nos vamos directamente a lo que es el proyecto la aplicación que crea funciona y si se va haciendo parte por parte con pedido muy concreto puede ser una buena ayuda. Usandola como un buscador glorificado, un corrector ortografico o hacer un conjunto de procesos al texto como partes repetitivas( ej eliminar comentario ) pero esta última y otras tareas empieza a dar problemas.

Por ejemplo al empezar con Gemini directamente lo primero que genero tenia texto en chino o cada cierto tiempo pasaba a crear una imagen con NanoBanana cuando le pedias otra cosa. Y cuanto más se alargaba la conversacion más comun era. Las pruebas con Claude y Minimax fueron bastante positivas, al pedirle que explicara el codigo lo hicieron de forma exhaustiva, demasiado pasando a ser un bloque teorico y explicando no el codigo sino los conceptos más básicos.

Los problemas pasaron por un lado al sobrecargarme de datos y opciones y que estar en el flujo de pregunta respuesta acababa por seguir preguntando sin terminar de probar o rebisar todo el código. Esto último pasaba a ser más y más problematico por las dificultades para arreglar error sin modificar o romper otra cosa distinta. A veces el arreglo era para sustituir todo el codigo dando algo distinto o eliminando partes que no aparecian en la conversacion.

Para mi, sobretodo en el nivel en el que me encuentro creo que sería necesario limitar el uso de la Ia, incluso reducirlo un poco para la busqueda de error.