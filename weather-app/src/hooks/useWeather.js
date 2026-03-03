import { useState, useEffect } from 'react';
import {
  fetchCurrentWeather,
  fetchForecast
} from '../api/weatherapi';
import { getCityCoordinates } from '../api/pollenapi';

// ─── useWeather ────────────────────────────────────────────────────────────────
// Returns all weather data needed across the app.
//
// Usage:
//   const { current, hourly, daily, sunset, loading, error } = useWeather('London')
//
// Shape of returned data:
//
// current: {
//   city: string,
//   temperature: number,       // °C rounded
//   feelsLike: number,         // °C rounded
//   high: number,              // °C rounded
//   low: number,               // °C rounded
//   humidity: number,          // % (0-100)
//   windSpeed: number,         // mph rounded
//   condition: string,         // e.g. "Rain", "Clear"
//   description: string,       // e.g. "light rain"
//   icon: string,              // OpenWeather icon code e.g. "10d"
//   uvIndex: number | null,
//   sunset: number,            // Unix timestamp
//   sunrise: number,           // Unix timestamp
// }
//
// hourly: Array of {
//   time: string,              // e.g. "9am"
//   temperature: number,
//   icon: string,
//   condition: string,
//   rainChance: number,        // % (0-100)
// }
//
// daily: Array of {
//   day: string,               // e.g. "Mon", "Tue"
//   date: string,              // full date string
//   high: number,
//   low: number,
//   icon: string,
//   condition: string,
//   rainChance: number,
// }
//
// sunset: string              // formatted as "HH:MM" e.g. "17:30"
// loading: boolean
// error: string | null

export const useWeather = (city) => {
  const [current, setCurrent] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [sunset, setSunset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        const [currentData, forecastData] = await Promise.all([
          fetchCurrentWeather(city),
          fetchForecast(city),
        ]);

        // Fetch UV from Open-Meteo, from OpenWeather I think you need to pay
        const coords = await getCityCoordinates(city);
        const uvResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=uv_index`
        );
        const uvData = await uvResponse.json();
        const uv = uvData?.current?.uv_index ?? null;

        const weatherWithUV = { ...currentData, uvIndex: uv !== null ? Math.round(uv) : null };

        const sunsetDate = new Date(currentData.sunset * 1000);
        const formattedSunset = sunsetDate.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });

        setCurrent(weatherWithUV);
        setHourly(forecastData.hourly);
        setDaily(forecastData.daily);
        setSunset(formattedSunset);
      } catch (err) {
        setError('Failed to load weather data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [city]);

  return { current, hourly, daily, sunset, loading, error };
};