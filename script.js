const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '0b8fe9382e4b99d8fab5959c63d434cd';

$(document).ready(function () { // ensures the weatherFn function is called only after the DOM is fully loaded
    weatherFn('94040'); // The sample ZIP code is used to immediately fetch and display weather data for a default location when the page first loads. This provides the user with initial content rather than an empty page.
});

// weather fetch function
async function weatherFn(zipCode) {
    const temp = `${url}?zip=${zipCode},us&appid=${apiKey}&units=imperial`; // constructs the full API request URL using template literals. 
    try {
        const res = await fetch(temp); //This fetches the weather data from the constructed URL and waits for the response.
        const data = await res.json();
        if (res.ok) {  // This checks if the response is successful.
            weatherShowFn(data);
        } else {
            alert('ZIP code not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${Math.round(data.main.temp)}°F`);
    $('#description').text(data.weather[0].description);
    $('#feels-like').html(`Feels like: ${Math.round(data.main.feels_like)}°F`);
    $('#humidity').html(`Humidity: ${data.main.humidity}%`);
    $('#location').text(`${data.name}, ${data.sys.country}`);
    $('#temp-high-low').html(`Hi: ${Math.round(data.main.temp_max)}°F / Lo: ${Math.round(data.main.temp_min)}°F`);
    $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    $('#weather-info').fadeIn();
}


// Explanation:
// This code ensures the weatherFn function is called only after the DOM is fully loaded, using a sample ZIP code for initialization.
// The sample ZIP code (94040) is used to immediately fetch and display weather data for a default location when the page first loads, providing the user with initial content rather than an empty page.

// The async function constructs the API request URL for the ZIP code and specifies that the temperature should be returned in Fahrenheit.
// It then fetches the data from the URL and waits for the response.
// Once the data is received, it is parsed into JSON format, meaning the raw JSON string is converted into a JavaScript object.
// If the response is successful (i.e., the status code is 200), the data is passed to the weatherShowFn function to update the elements on the webpage.
// If the ZIP code is not found, an alert is shown to the user.
// Any other errors, such as network issues, are caught and logged to the console.