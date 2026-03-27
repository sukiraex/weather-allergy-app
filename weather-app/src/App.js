import { useState, useEffect } from 'react'; 
import { useWeather } from './hooks/useWeather';
import { usePollen } from './hooks/usePollen';

// colour variables
import { COLOURS } from "./theme/colours";

// widgets
import WeatherCard from './components/wwidget/wwidget';
import WindWidget from './components/widgets/WindWidget';
import HumidityWidget from './components/widgets/HumidityWidget';
import UVWidget from './components/widgets/UVWidget';
import SunsetWidget from './components/widgets/SunsetWidget';

// header components (location, time, theme toggle)
import LocationBox from './components/header/LocationBox.jsx';
import LocalTime from './components/header/LocalTime.jsx';
import { useTheme } from "./hooks/useTheme"; 
import ThemeToggle from './components/header/ThemeToggle.jsx'; 
import { useLocation } from "./hooks/useLocation";
import { useLocalTime } from "./hooks/useLocalTime";

function App() {
  const [locationConfirmed, setLocationConfirmed] = useState(false); // whether the user has confirmed their location (either by allowing geolocation or selecting a suggestion)
 
  const { isDark, toggleTheme, customBg, setCustomBg } = useTheme(); // for theme toggling

  // location to get weather for, and all the related info like suggestions, errors etc
  const {
    location,
    displayCity,
    locationError,
    useManual,
    setUseManual,
    query,
    setQuery,
    suggestions,
    loadingSuggestions,
    selectSuggestion,
  } = useLocation(setLocationConfirmed);
 
  const localTime = useLocalTime(location);  // get the local time for the location (used in header and sunset widget)
 
  const { weather: current, hourly, daily, loading: weatherLoading, error: weatherError, sunset } = useWeather(location);
  const { overall, types, trend, pollenDaily, loading: pollenLoading, error: pollenError } = usePollen(location);
  
  const trendLabel = trend === 1 ? 'Increasing' : trend === -1 ? 'Decreasing' : 'Stable';

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'monospace',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      minHeight: '100vh',
      transition: 'background-color 0.3s, color 0.3s'
    }}>
 
      {/* header (location, time, theme toggle) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
 
        <LocationBox
          locationConfirmed={locationConfirmed}
          setLocationConfirmed={setLocationConfirmed}
          displayCity={displayCity}
          locationError={locationError}
          useManual={useManual}
          setUseManual={setUseManual}
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          loadingSuggestions={loadingSuggestions}
          selectSuggestion={selectSuggestion}
        />
 
        <LocalTime localTime={localTime} displayCity={displayCity} />
 
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} customBg={customBg} setCustomBg={setCustomBg} />
 
      </div>
 
      {/* widgets of the weather app */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <WeatherCard city={displayCity || "London"} />
        <SunsetWidget city={displayCity || "London"} />
        <WindWidget city={displayCity || "London"} />
        <HumidityWidget city={displayCity || "London"} />
        <UVWidget city={displayCity || "London"} />
      </div>
    
      {/* weather section (pollen) */}
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
