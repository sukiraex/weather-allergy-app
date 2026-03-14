import { useState, useEffect } from 'react'; 
import { useWeather } from './hooks/useWeather';
import { usePollen } from './hooks/usePollen';
import { COLOURS } from "./theme/colours";
import { useLocation } from "./hooks/useLocation";

import WeatherCard from './components/wwidget/wwidget';
import WindWidget from './components/wwidget/widgets/WindWidget';
import HumidityWidget from './components/wwidget/widgets/HumidityWidget';
import UVWidget from './components/wwidget/widgets/UVWidget';
import SunsetWidget from './components/wwidget/widgets/SunsetWidget';

function App() {
  const [city, setCity] = useState('');
  const [locationConfirmed, setLocationConfirmed] = useState(false);

  const {
    location,
    displayCity,
    locationError,
    useManual,
    setUseManual,
    setLocation,
    setDisplayCity,
    setLocationError
  } = useLocation(setLocationConfirmed);

  // Weather + pollen hooks
  const weather = useWeather(location ? null : city, location);
  const pollen  = usePollen(location ? null : city, location);

  const {
    current,
    hourly,
    daily,
    sunset,
    loading: weatherLoading,
    error: weatherError
  } = weather;

  const {
    overall,
    types,
    trendLabel,
    daily: pollenDaily,
    loading: pollenLoading,
    error: pollenError
  } = pollen;

  // manual city submit handler
  const handleCitySubmit = (e) => {
    e.preventDefault();

    if (city.trim() === '') {
      setLocationError('Please enter a city name.');
      return;
    }

    setLocation(null);
    setDisplayCity(city);
    setLocationError(null);
    setLocationConfirmed(true);
  };


  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', backgroundColor: COLOURS.LIGHT_GREY }}>
      <h1 style={{ color: COLOURS.BLUE }}>API Test</h1>

    {/* location input */}
    <div className="location-container">

      {locationConfirmed ? (
        <div className="location-confirmed">

          <p className="location-text">📍 {displayCity}</p>

          <button
            className="edit-location-button"
            onClick={() => {
              setLocationConfirmed(false);
              setUseManual(true);
            }}
          >
            Edit
          </button>

        </div>
      ) : (
        <>
          <p className="location-message">
            {locationError || "Detecting your location..."}
          </p>

          {useManual && (
            <form onSubmit={handleCitySubmit} className="location-form">

              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search city..."
                className="location-input"
              />

              <button type="submit" className="location-button">
                Search
              </button>

            </form>
          )}
        </>
      )}

    </div>

      {/* Fancy widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <WeatherCard city={displayCity || "London"} />
        <SunsetWidget />
        <WindWidget />
        <HumidityWidget />
        <UVWidget />
      </div>


      {/* Weather Section */}
      <h2 style={{ color: COLOURS.DARK_GREY }}>Weather</h2>
      {weatherLoading && <p>Loading weather...</p>}
      {weatherError && <p style={{ color: COLOURS.RED }}>ERROR: {weatherError}</p>}
      {current && (
        <div>
          <p>Temperature: {current.temperature}C</p>
          <p>Feels like: {current.feelsLike}C</p>
          <p>High: {current.high}C / Low: {current.low}C</p>
          <p>Condition: {current.condition} - {current.description}</p>
          <p>Humidity: {current.humidity}%</p>
          <p>Wind: {current.windSpeed}mph</p>
          <p>UV Index: {current.uvIndex ?? 'unavailable'}</p>
          <p>Sunset: {sunset}</p>
        </div>
      )}

      <h3>Hourly</h3>
      {hourly.map((h, i) => (
        <p key={i}>{h.time} - {h.temperature}C - Rain: {h.rainChance}%</p>
      ))}

      <h3>7-Day Forecast</h3>
      {daily.map((d, i) => (
        <p key={i}>{d.day} - High: {d.high}C Low: {d.low}C - Rain: {d.rainChance}%</p>
      ))}

      <hr />

      <h2>Pollen</h2>
      {pollenLoading && <p>Loading pollen...</p>}
      {pollenError && <p style={{ color: COLOURS.RED }}>ERROR: {pollenError}</p>}
      {overall && (
        <div>
          <p>Overall Score: {overall.score} - {overall.label}</p>
          <p>Trend: {trendLabel}</p>
          <p>Tree: {types.tree.percentage}% - {types.tree.label}</p>
          <p>Grass: {types.grass.percentage}% - {types.grass.label}</p>
          <p>Weed: {types.weed.percentage}% - {types.weed.label}</p>
        </div>
      )}

      <h3>7-Day Pollen Forecast</h3>
      {pollenDaily.map((d, i) => (
        <p key={i}>{d.day} - Score: {d.score} - {d.label}</p>
      ))}
    </div>
  );
}

export default App;
