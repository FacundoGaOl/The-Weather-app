const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m";

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("No hemos encontrado los datos, mira por la ventana mejor", error);
        return null;
    }
}

function