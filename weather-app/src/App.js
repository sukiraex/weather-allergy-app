import { useWeather } from './hooks/useWeather';
import { usePollen } from './hooks/usePollen';

const CITY = 'London';

function App() {
  const { current, hourly, daily, sunset, loading: weatherLoading, error: weatherError } = useWeather(CITY);
  const { overall, types, trendLabel, daily: pollenDaily, loading: pollenLoading, error: pollenError } = usePollen(CITY);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>API Test</h1>

      <h2>Weather</h2>
      {weatherLoading && <p>Loading weather...</p>}
      {weatherError && <p style={{ color: 'red' }}>ERROR: {weatherError}</p>}
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
      {pollenError && <p style={{ color: 'red' }}>ERROR: {pollenError}</p>}
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