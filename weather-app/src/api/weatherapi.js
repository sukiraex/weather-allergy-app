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
      city: data.name,  // Works for both city query and lat/lon (returns nearest city name)
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      high: Math.round(data.main.temp_max),
      low: Math.round(data.main.temp_min),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // m/s → km/h; change to * 2.237 for mph if preferred
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      uvIndex: null, // Filled later in hook
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Hourly + 7-day forecast (5-day/3hr free tier)
export const fetchForecast = async (location) => {
  try {
    const params = {
      ...getLocationParams(location),
      units: 'metric',
      appid: API_KEY,
    };

    const response = await axios.get(`${BASE_URL}/forecast`, { params });

    const list = response.data.list;

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

    // Daily — group by date, prefer midday if available
    const dailyMap = {};
    list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();
      const hour = date.getHours();

      if (!dailyMap[dayKey] || hour === 12) {
        dailyMap[dayKey] = {
          day: date.toLocaleDateString('en-GB', { weekday: 'short' }),
          date: dayKey,
          high: Math.round(item.main.temp_max),
          low: Math.round(item.main.temp_min),
          icon: item.weather[0].icon,
          condition: item.weather[0].main,
          rainChance: Math.round((item.pop || 0) * 100),
        };
      }
    });

    const daily = Object.values(dailyMap).slice(0, 7);

    return { hourly, daily };
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};