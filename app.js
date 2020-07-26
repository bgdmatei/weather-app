
// Select elements
const iconElement = document.querySelector('.weather-icon')
const tempElement = document.querySelector('.temperature-value p')
const descElement = document.querySelector('.temperature-description p')
const locationElement = document.querySelector('.location p')
const notificationElement = document.querySelector('.notification')

// App data

const weather = {}

weather.temperature = {
    unit: 'celsius'
}

const KELVIN = 273;
const key = 'a8bafe43d83f44bd2d24af0c21b68472';


if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError)
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p> Browser doesn't support geolocation"
}

//Set user's position

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude)
}

function showError(error){
    notificationElement.style.display ='block';
    notificationElement.innerHTML = `<p> ${error.message} <p>`
}

//Get weather from api
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

    fetch(api)
        .then(function(res){
            let data = res.json()
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN)
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather()
        })
}

// Display weather 
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = `${weather.description}`;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
}