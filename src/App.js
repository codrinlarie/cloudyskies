import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export default function WeatherApp() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    if (!lat || !lon) {
      setError('Please enter both latitude and longitude.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`https://cloudyskies.netlify.app/.netlify/functions/weather?lat=${lat}&lon=${lon}`);
      setWeatherData(response.data);
      console.log(response.data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="Latitude"
        />
        <input
          type="text"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          placeholder="Longitude"
        />
        <button onClick={fetchWeatherData} disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-data">
          <h2>Weather Information</h2>
          <p>Temperature: {weatherData.current.temp}°K</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Weather: {weatherData.current.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}