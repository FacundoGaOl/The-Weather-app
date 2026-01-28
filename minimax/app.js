// ============================================
// PART 1: SELECTING DOM ELEMENTS
// ============================================

// These lines find the HTML elements we need to work with and store them in variables.
// The DOM (Document Object Model) is the browser's representation of the HTML page.
// Think of it as a tree where every HTML element is a "node" we can access.

const citySelect = document.getElementById('city-select');
const latitudeInput = document.getElementById('latitude');
const longitudeInput = document.getElementById('longitude');
const getWeatherBtn = document.getElementById('get-weather');
const weatherResult = document.getElementById('weather-result');
const tempValue = document.getElementById('temp-value');
const windSpeed = document.getElementById('wind-speed');
const windDirection = document.getElementById('wind-direction');

/* 
   document.getElementById() is a built-in function that searches the DOM
   for an element with a specific id attribute and returns it.
   
   We use const because these variables will always reference the same elements.
   Storing these in variables at the top makes our code cleaner and faster
   (we don't have to search the DOM every time we need an element).
*/

// ============================================
// PART 2: ADDING EVENT LISTENERS
// ============================================

// An event listener waits for something to happen (like a click) and then runs code.

// 2.1: When user selects a city from the dropdown
citySelect.addEventListener('change', function() {
    /*
       addEventListener() attaches a "listener" that watches for events.
       'change' fires when the dropdown selection changes.
       The function (called a callback) runs when the event occurs.
    */
    
    const selectedValue = this.value;
    // "this" refers to the element the event happened on (citySelect)
    
    if (selectedValue) {
        // If the user selected a valid option (not the placeholder)
        
        // Split the value string at the comma to get [latitude, longitude]
        const [lat, lon] = selectedValue.split(',');
        // split(',') turns "51.5074,-0.1278" into ["51.5074", "-0.1278"]
        // Array destructuring assigns these to lat and lon variables
        
        latitudeInput.value = lat.trim();
        longitudeInput.value = lon.trim();
        // .trim() removes any extra spaces around the values
    }
});

// 2.2: When user clicks the "Get Weather" button
getWeatherBtn.addEventListener('click', fetchWeather);

/*
   We pass the function name (not calling it with parentheses) because
   we want to tell the browser "call this function when the click happens."
   If we wrote fetchWeather() with parentheses, it would call the function
   immediately when the page loads, not when clicked.
*/

// ============================================
// PART 3: FETCHING DATA FROM THE API
// ============================================

async function fetchWeather() {
    /*
       async functions are special - they always return a Promise.
       They allow us to use the 'await' keyword, which makes async code
       (like network requests) look like simple synchronous code.
       
       "Async" = Asynchronous = Things that take time (like waiting for a server).
       Without async/await, we'd need to use callbacks or Promises with .then().
    */
    
    // Get the values from the input fields
    const latitude = latitudeInput.value.trim();
    const longitude = longitudeInput.value.trim();
    
    // Validation: Make sure user entered coordinates
    if (!latitude || !longitude) {
        // If either field is empty, show an alert and stop
        alert('Please enter both latitude and longitude values.');
        return; // Exit the function early
    }
    
    // Show the result section (in case it was hidden)
    weatherResult.classList.remove('hidden');
    
    // Show loading state in temperature display
    tempValue.textContent = '...';
    windSpeed.textContent = '--';
    windDirection.textContent = '--';
    
    // Disable the button to prevent multiple clicks while loading
    getWeatherBtn.disabled = true;
    getWeatherBtn.textContent = 'Loading...';
    
    try {
        /*
           try/catch is error handling. Code that might fail goes in try.
           If something goes wrong, the error jumps to the catch block.
           This prevents the entire app from crashing if something fails.
        */
        
        // Construct the API URL
        // Template literals (backticks `) allow embedded expressions with ${}
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        
        /*
           Breaking down the URL:
           - Base: https://api.open-meteo.com/v1/forecast
           - ? starts the query parameters
           - latitude=${latitude} adds the user's latitude
           - & separates multiple parameters
           - current_weather=true tells the API we only want current weather data
           
           Example URL: https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current_weather=true
        */
        
        // Make the API request
        const response = await fetch(apiUrl);
        
        /*
           fetch() is the modern way to make HTTP requests in JavaScript.
           It returns a Response object representing the server's reply.
           await pauses execution until the response comes back.
           
           Without await, the code would continue immediately before getting data.
        */
        
        // Check if the request was successful
        if (!response.ok) {
            // response.ok is true only for status codes 200-299
            throw new Error('Weather data not available for this location');
            // throw creates an error that immediately jumps to catch block
        }
        
        // Parse the JSON response
        const data = await response.json();
        
        /*
           response.json() extracts the JSON data from the response.
           JSON (JavaScript Object Notation) is a text format for data.
           The await is needed because parsing JSON takes time.
           
           Example response structure:
           {
             "latitude": 40.7128,
             "longitude": -74.006,
             "current_weather": {
               "temperature": 15.2,
               "windspeed": 12.5,
               "winddirection": 180
             }
           }
        */
        
        // Extract the weather data
        // We use optional chaining (?.) to safely access nested properties
        const currentWeather = data.current_weather;
        const temperature = currentWeather?.temperature ?? 'N/A';
        const windSpeedValue = currentWeather?.windspeed ?? 'N/A';
        const windDirectionValue = currentWeather?.winddirection ?? 'N/A';
        
        /*
           current_weather is an object inside the data. We access it with dot notation.
           The ?? operator is the nullish coalescing operator - it provides a fallback
           value if the left side is null or undefined.
           
           If temperature exists, use it; otherwise use 'N/A'.
        */
        
        // Update the HTML with the weather data
        tempValue.textContent = temperature;
        windSpeed.textContent = windSpeedValue;
        windDirection.textContent = windDirectionValue;
        
        /*
           textContent sets the visible text inside an element.
           This is how we dynamically update the page with API data.
        */
        
    } catch (error) {
        // This runs if anything in the try block fails
        console.error('Error fetching weather:', error);
        // Log the error to console (useful for debugging)
        
        // Show error message to user
        alert('Failed to fetch weather data. Please check your coordinates and try again.');
        
        // Hide the result section on error
        weatherResult.classList.add('hidden');
        
    } finally {
        // This code runs whether the request succeeded or failed
        // It's like a "cleanup" step that always happens
        getWeatherBtn.disabled = false;
        getWeatherBtn.textContent = 'Get Weather';
        
        // Re-enable the button so user can try again
    }
}

/*
   API Response Structure (what Open-Meteo returns):
   
   {
     "latitude": 40.7128,
     "longitude": -74.006,
     "generationtime_ms": 0.5,
     "utc_offset_seconds": 0,
     "timezone": "GMT",
     "timezone_abbreviation": "GMT",
     "elevation": 10,
     "current_weather": {
       "temperature": 15.2,
       "windspeed": 12.5,
       "winddirection": 180,
       "weathercode": 0,
       "is_day": 1,
       "time": "2024-01-15T12:00"
     }
   }
   
   We only need: temperature, windspeed, and winddirection from current_weather.
*/