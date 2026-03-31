import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Helper to build params based on input
const getLocationParams = (location) => {
  if (typeof location === 'object' && location.lat != null && location.lon != null) {
    return { lat: location.lat, lon: location.lon };
  } else if (typeof location === 'string' && location.trim()) {
    return { q: location };
  }
  throw new Error('Invalid location: must be city string or { lat, lon } object');
};

const WMO_ICON = (code) => {
  if (code === 0 || code === 1) return '01d';
  if (code === 2) return '02d';
  if (code === 3) return '04d';
  if (code <= 49) return '50d';
  if (code <= 59) return '09d';
  if (code <= 69) return '10d';
  if (code <= 79) return '13d';
  if (code <= 82) return '09d';
  if (code <= 86) return '13d';
  if (code <= 99) return '11d';
  return '01d';
};

// Current weather + feels like + high/low
export const fetchCurrentWeather = async (location) => {
  try {
    const params = {
      ...getLocationParams(location),
      units: 'metric',
      appid: API_KEY,
    };

    const response = await axios.get(`${BASE_URL}/weather`, { params });

    const data = response.data;

    return {
      city: data.name,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      high: Math.round(data.main.temp_max),
      low: Math.round(data.main.temp_min),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      timezoneOffset: data.timezone ?? 0,
      uvIndex: null,
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Hourly (OpenWeather) + Daily (Open-Meteo)
export const fetchForecast = async (location) => {
  try {
    const params = {
      ...getLocationParams(location),
      units: 'metric',
      appid: API_KEY,
    };

    // OpenWeather for hourly
    const owResponse = await axios.get(`${BASE_URL}/forecast`, { params });
    const list = owResponse.data.list;

    // Hourly — next 6 entries (~18 hours)
    const hourly = list.slice(0, 6).map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('en-GB', {
        hour: 'numeric',
        hour12: true,
      }),
      temperature: Math.round(item.main.temp),
      icon: item.weather[0].icon,
      condition: item.weather[0].main,
      rainChance: Math.round((item.pop || 0) * 100),
    }));

    // Extract lat/lon from OpenWeather response to avoid a second geocoding call
    const { lat, lon } = owResponse.data.city.coord;

    // Open-Meteo for daily — today + 7 days
    const omResponse = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        daily: [
          'temperature_2m_max',
          'temperature_2m_min',
          'weather_code',
          'precipitation_probability_max',
        ].join(','),
        timezone: 'auto',
        forecast_days: 7,
      },
    });

    const { daily } = omResponse.data;

    const dailyData = daily.time.map((time, i) => ({
      day: new Date(time).toLocaleDateString('en-GB', { weekday: 'short' }),
      date: new Date(time).toDateString(),
      high: Math.round(daily.temperature_2m_max[i]),
      low: Math.round(daily.temperature_2m_min[i]),
      icon: WMO_ICON(daily.weather_code[i]),
      condition: daily.weather_code[i],
      rainChance: daily.precipitation_probability_max[i] ?? 0,
    }));

    return { hourly, daily: dailyData };
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};