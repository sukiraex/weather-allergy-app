import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Current weather + feels like + high/low
export const fetchCurrentWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY,
      },
    });

    const data = response.data;

    return {
      city: data.name,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      high: Math.round(data.main.temp_max),
      low: Math.round(data.main.temp_min),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // convert m/s to mph
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      uvIndex: null, // UV comes from a separate endpoint — see fetchUVIndex
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Hourly + 7-day forecast (OpenWeather free tier gives 5-day/3hr forecast)
export const fetchForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY,
      },
    });

    const list = response.data.list;

    // Hourly — next 6 entries (each is 3hrs apart, so covers ~18hrs)
    const hourly = list.slice(0, 6).map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('en-GB', {
        hour: 'numeric',
        hour12: true,
      }),
      temperature: Math.round(item.main.temp),
      icon: item.weather[0].icon,
      condition: item.weather[0].main,
      rainChance: Math.round((item.pop || 0) * 100), // probability of precipitation
    }));

    // Daily — group by date, pick midday reading for each day
    const dailyMap = {};
    list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();
      const hour = date.getHours();

      // Prefer the 12:00 reading, otherwise just take first available
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

// UV Index — requires lat/lon, get those from current weather first
export const fetchUVIndex = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall`,
      {
        params: {
          lat,
          lon,
          exclude: 'minutely,hourly,daily,alerts',
          appid: API_KEY,
        },
      }
    );

    return response.data.current.uvi;
  } catch (error) {
    console.error('Error fetching UV index:', error);
    return null; // non-critical, fail silently
  }
};