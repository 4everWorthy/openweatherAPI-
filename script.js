const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '0b8fe9382e4b99d8fab5959c63d434cd';

$(document).ready(function () {
    weatherFn('94040'); // Example ZIP code for initialization
});

async function weatherFn(zipCode) {
    const temp = `${url}?zip=${zipCode},us&appid=${apiKey}&units=imperial`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
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
