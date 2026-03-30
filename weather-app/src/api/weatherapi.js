import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';

// WMO weather code → condition + icon mapping (using OpenWeatherMap icon codes)
const getWeatherInfo = (code, isDay = 1) => {
  const d = isDay ? 'd' : 'n';
  if (code === 0) return { condition: 'Clear', description: 'clear sky', icon: `01${d}` };
  if (code === 1) return { condition: 'Clear', description: 'mainly clear', icon: `01${d}` };
  if (code === 2) return { condition: 'Clouds', description: 'partly cloudy', icon: `02${d}` };
  if (code === 3) return { condition: 'Clouds', description: 'overcast', icon: `04${d}` };
  if (code <= 49) return { condition: 'Fog', description: 'foggy', icon: `50${d}` };
  if (code <= 59) return { condition: 'Drizzle', description: 'drizzle', icon: `09${d}` };
  if (code <= 69) return { condition: 'Rain', description: 'rain', icon: `10${d}` };
  if (code <= 79) return { condition: 'Snow', description: 'snow', icon: `13${d}` };
  if (code <= 82) return { condition: 'Rain', description: 'rain showers', icon: `09${d}` };
  if (code <= 86) return { condition: 'Snow', description: 'snow showers', icon: `13${d}` };
  if (code <= 99) return { condition: 'Thunderstorm', description: 'thunderstorm', icon: `11${d}` };
  return { condition: 'Unknown', description: 'unknown', icon: `01${d}` };
};

// Resolve city string → lat/lon using Open-Meteo geocoding
const resolveLocation = async (location) => {
  if (typeof location === 'object' && location.lat != null && location.lon != null) {
    return { lat: location.lat, lon: location.lon, city: location.city || '' };
  }

  const res = await axios.get(GEO_URL, {
    params: { name: location, count: 1, language: 'en', format: 'json' },
  });

  const result = res.data.results?.[0];
  if (!result) throw new Error(`Location not found: ${location}`);

  return { lat: result.latitude, lon: result.longitude, city: result.name };
};

export const fetchCurrentWeather = async (location) => {
  try {
    const { lat, lon, city } = await resolveLocation(location);

    const response = await axios.get(BASE_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        current: [
          'temperature_2m',
          'apparent_temperature',
          'weather_code',
          'wind_speed_10m',
          'relative_humidity_2m',
          'is_day',
        ].join(','),
        daily: ['temperature_2m_max', 'temperature_2m_min', 'sunrise', 'sunset'].join(','),
        timezone: 'auto',
        forecast_days: 1,
      },
    });

    const c = response.data.current;
    const d = response.data.daily;
    const { condition, description, icon } = getWeatherInfo(c.weather_code, c.is_day);

    return {
      city,
      temperature: Math.round(c.temperature_2m),
      feelsLike: Math.round(c.apparent_temperature),
      high: Math.round(d.temperature_2m_max[0]),
      low: Math.round(d.temperature_2m_min[0]),
      humidity: c.relative_humidity_2m,
      windSpeed: Math.round(c.wind_speed_10m),
      condition,
      description,
      icon,
      sunrise: d.sunrise[0],
      sunset: d.sunset[0],
      uvIndex: null,
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const fetchForecast = async (location) => {
  try {
    const { lat, lon } = await resolveLocation(location);

    const response = await axios.get(BASE_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        hourly: ['temperature_2m', 'weather_code', 'precipitation_probability'].join(','),
        daily: [
          'temperature_2m_max',
          'temperature_2m_min',
          'weather_code',
          'precipitation_probability_max',
        ].join(','),
        timezone: 'auto',
        forecast_days: 7, // today + 7 days ahead
      },
    });

    const { hourly, daily } = response.data;

    // Hourly — next 6 entries from current hour
    const now = new Date();
    const currentHourIndex = hourly.time.findIndex((t) => new Date(t) >= now);
    const startIndex = currentHourIndex === -1 ? 0 : currentHourIndex;

    const hourlyData = hourly.time.slice(startIndex, startIndex + 6).map((time, i) => {
      const idx = startIndex + i;
      return {
        time: new Date(time).toLocaleTimeString('en-GB', { hour: 'numeric', hour12: true }),
        temperature: Math.round(hourly.temperature_2m[idx]),
        icon: getWeatherInfo(hourly.weather_code[idx]).icon,
        condition: getWeatherInfo(hourly.weather_code[idx]).condition,
        rainChance: hourly.precipitation_probability[idx] ?? 0,
      };
    });

    // Daily — today at index 0, next 7 days follow
    const dailyData = daily.time.map((time, i) => ({
      day: new Date(time).toLocaleDateString('en-GB', { weekday: 'short' }),
      date: new Date(time).toDateString(),
      high: Math.round(daily.temperature_2m_max[i]),
      low: Math.round(daily.temperature_2m_min[i]),
      icon: getWeatherInfo(daily.weather_code[i]).icon,
      condition: getWeatherInfo(daily.weather_code[i]).condition,
      rainChance: daily.precipitation_probability_max[i] ?? 0,
    }));

    return { hourly: hourlyData, daily: dailyData };
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};