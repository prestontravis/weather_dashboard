// get the necessary HTML elements
const searchForm = document.getElementById('search-form');


searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const city = searchInput.value.trim();
    if (!city) {
      alert('Please enter a city name.');
      return;
    }
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherData(weatherData);
      const forecastData = await getForecastData(city);
      displayForecastData(forecastData);
    } catch (error) {
      alert('Unable to fetch weather data. Please try again later.');
      console.error(error);
    }
  });
  
const searchInput = document.getElementById('search-city');
const cityName = document.getElementById('city-name');
const currentDate = document.getElementById('current-date');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const forecastDetails = document.getElementById('forecast-details');
const searchHistoryList = document.getElementById('history-list');



// create a function to fetch weather data from the API
async function getWeatherData(city) {
  const apiKey = 'ac6fd43729738fba58989f34a3414481';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

// create a function to fetch the forecast data from the API
async function getForecastData(city) {
  const apiKey = 'ac6fd43729738fba58989f34a3414481';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

// create a function to display the weather data
function displayWeatherData(data) {
  cityName.textContent = data.name;
  const date = new Date();
  currentDate.textContent = date.toLocaleDateString();
  weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${Math.round(data.wind.speed)} m/s`;
}

// create a function to display the forecast data
function displayForecastData(forecastData) {
    // Select the "forecast-details" element
    const forecastDetails = document.querySelector('#forecast-details');
  
    // Clear the previous forecast data
    forecastDetails.innerHTML = '';
  
    // Loop through the forecast data and create HTML elements for each day
    for (let i = 0; i < forecastData.list.length; i += 8) {
      // Get the forecast data for the current day
      const forecast = forecastData.list[i];
  
      // Create a div element to hold the forecast item
      const forecastItem = document.createElement('div');
      forecastItem.classList.add('forecast-item');
  
      // Create a paragraph element to display the date
      const date = new Date(forecast.dt * 1000);
      const dateElement = document.createElement('p');
      dateElement.classList.add('forecast-date');
      dateElement.textContent = date.toLocaleDateString();
      forecastItem.appendChild(dateElement);
  
      // Create an image element to display the weather icon
      const iconUrl = `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
      const iconElement = document.createElement('img');
      iconElement.classList.add('forecast-icon');
      iconElement.setAttribute('src', iconUrl);
      forecastItem.appendChild(iconElement);
  
      // Create a paragraph element to display the temperature
      const temp = Math.round(forecast.main.temp * 1.8 + 32);
      const tempElement = document.createElement('p');
      tempElement.classList.add('forecast-temp');
      tempElement.textContent = `${temp} °F`;
      forecastItem.appendChild(tempElement);
  
      // Create a paragraph element to display the humidity
      const humidity = forecast.main.humidity;
      const humidityElement = document.createElement('p');
      humidityElement.classList.add('forecast-humidity');
      humidityElement.textContent = `Humidity: ${humidity}%`;
      forecastItem.appendChild(humidityElement);
  
      // Create a paragraph element to display the wind speed
      const windSpeed = Math.round(forecast.wind.speed);
      const windSpeedElement = document.createElement('p');
      windSpeedElement.classList.add('forecast-wind-speed');
      windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;
      forecastItem.appendChild(windSpeedElement);
  
      // Add the forecast item to the "forecast-details" section
      forecastDetails.appendChild(forecastItem);
    }
  }