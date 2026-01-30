# Mobile Weather App
Es una aplicacion mobile first que muestra el tiempo actual consumiendo los datos de la API deOpen-meteo

## Arquitectura y enfoque técnico
El proyecto está desarrollado en JavaScript separando responsabilidades:
app.js - llamadas a la API y configuración del clima
index.html - estructura
style.css - estilo de la web

## Tecnologías utilizadas
HTML5
CSS3 
JavaScript 
Git & GitHub 
GitHub Pages 

## APIs

Open-Meteo Weather API https://open-meteo.com (datos meteorológicos)

## ómo ejecutar el proyecto en local
Opción recomendada (VS Code)
    Instala la extensión Live Server
    Abre el proyecto en VS Code
    Click derecho sobre index.html → Open with Live Server

## Estado del proyecto

Actualmente está en  dev una version más sencilla que la que se estaba trabajando pero si es funcional, esto lo ampliaré en el apartado de uso de la IA

## Uso de la IA

Uno de los objetivos del ejercicio era el uso de la IA, de varias y poder encontrar que usos practicos podía tener.
Al no haberla usando antes tanto decidi directamente usarla para todo lo que no fue una buena idea. 
No dio malos resultados si preguntaba una parte o tarea concreta pero acabe atascado en el flujo de pregunta y respuesta terminando por no saber que estaba pasando y perdiendo el estado del código. Sobretodo al realizarlo con varias distinta y sin terminar de revisar el codigo 100% antes de la siguiente pregunta acabe sobrecargado y atascado. Decidí intentar hacerla de cero paso a paso agarrrando las partes que me  interesaban de cada una pero encontre un error que habia pasado por alto que terminaba en un bucle infinito de llamadas fallidas a la API que todavía está por resolver.
El plan de acción ahora es rehacer la app y arreglar el bug de las llamadas a la API.