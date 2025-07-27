import React, { useState } from 'react';
import './Weather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('')
  const apiKey = 'd08d7db16797e1b7a8ce16ad6a829e3c'; // Your OpenWeather API key

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      setWeatherData(null); // Clear old data
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      console.log(data)

      if (data.cod === 200) {
        setError('');
        setWeatherData({
          city: data.name,
          country: data.sys.country,
          state: data.sys.state || 'N/A',
          temperature: data.main.temp,
          feelsLike: data.main.feels_like,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          windSpeed: data.wind.speed,
          windDirection: data.wind.deg,
        });

      } else {
        setWeatherData(null);
        setError(`City not found: ${city}`);
      }
    }
    catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Something went wrong. Please try again later.');
      setWeatherData(null);
    }
  };

  return (
    <div className="search-container">
      <h2 className="title">Weather Finder</h2>

      <div className="search-box">
        <input
          className="search-input"
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-button" onClick={fetchWeather}>
          <FontAwesomeIcon icon={faSearch} style={{ marginRight: '8px' }} />
          
        </button>

      </div>
      {error && <h4 style={{ color: 'red' }}>{error}</h4>}
      {weatherData && (
        <div className="weather-card">
          <h3>Current Weather Details</h3>
          <p><strong>City:</strong> {weatherData.city}</p>
          <p><strong>Country:</strong> {weatherData.country}</p>
          <p><strong>Temperature:</strong> {weatherData.temperature} °C</p>
          <p><strong>Feels Like:</strong> {weatherData.feelsLike} °C</p>
          <p><strong>Weather:</strong> {weatherData.description}</p>
          <p><strong>Humidity:</strong> {weatherData.humidity}%</p>
          <p><strong>Pressure:</strong> {weatherData.pressure} hPa</p>
          <p><strong>Wind Speed:</strong> {weatherData.windSpeed} km/h</p>
          <p><strong>Wind Direction:</strong> {weatherData.windDirection}°</p>
        </div>

      )}
    </div>
  );
}

export default Weather;
