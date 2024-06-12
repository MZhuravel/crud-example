import React, { useState, useEffect } from 'react';
import './Weather.css';

const CITY_OPTIONS = [
  { label: 'Kyiv', value: { lat: 50.45, lon: 30.52 } },
  { label: 'Lviv', value: { lat: 49.84, lon: 24.03 } },
  { label: 'Odessa', value: { lat: 46.48, lon: 30.73 } },
  { label: 'Kharkiv', value: { lat: 49.99, lon: 36.23 } },
  { label: 'New York', value: { lat: 40.71, lon: -74.01 } },
  { label: 'London', value: { lat: 51.51, lon: -0.13 } },
  { label: 'Tokyo', value: { lat: 35.68, lon: 139.76 } },
  { label: 'Sydney', value: { lat: -33.87, lon: 151.21 } },
  { label: 'Paris', value: { lat: 48.85, lon: 2.35 } },
  { label: 'Berlin', value: { lat: 52.52, lon: 13.41 } },
  { label: 'Beijing', value: { lat: 39.91, lon: 116.40 } },
  { label: 'Mumbai', value: { lat: 19.08, lon: 72.88 } }
];

const Weather = () => {
  const [selectedCity, setSelectedCity] = useState(CITY_OPTIONS[0]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWeather(selectedCity.value);
  }, [selectedCity]);

  const fetchWeather = async ({ lat, lon }) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&precipitation_probability=true&humidity=true`
      );
      const data = await response.json();

      setWeatherData({
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather in {selectedCity.label}</h1>
      <select
        value={selectedCity.label}
        onChange={(e) => {
          const city = CITY_OPTIONS.find(city => city.label === e.target.value);
          setSelectedCity(city);
        }}
      >
        {CITY_OPTIONS.map(city => (
          <option key={city.label} value={city.label}>{city.label}</option>
        ))}
      </select>

      {loading ? (
        <div>Loading...</div>
      ) : weatherData ? (
        <div className="weather-info">
          <div className="weather-item">
            <h2>Temperature</h2>
            <p>{weatherData.temperature}°C</p>
          </div>
          <div className="weather-item">
            <h2>Wind Speed</h2>
            <p>{weatherData.windspeed} km/h</p>
          </div>
        </div>
      ) : (
        <div>No Data Available</div>
      )}
    </div>
  );
};

export default Weather;
