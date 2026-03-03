import axios from 'axios';

// Open-Meteo Air Quality API — completely free, no API key needed
// Docs: https://open-meteo.com/en/docs/air-quality-api
const BASE_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

// First we need lat/lon for the city
// We use OpenWeather Geocoding for this (same API key)
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// Helper — convert city name to lat/lon
export const getCityCoordinates = async (city) => {
  try {
    const response = await axios.get(GEO_URL, {
      params: {
        q: city,
        limit: 1,
        appid: WEATHER_API_KEY,
      },
    });

    if (response.data.length === 0) throw new Error('City not found');

    const { lat, lon } = response.data[0];
    return { lat, lon };
  } catch (error) {
    console.error('Error getting city coordinates:', error);
    throw error;
  }
};

// Helper — map raw pollen value (grains/m³) to a 0–10 score and label
const getPollenLevel = (value) => {
  if (value === null || value === undefined) return { score: 0, label: 'N/A' };
  if (value < 10) return { score: Math.round(value / 1.5), label: 'Low' };
  if (value < 30) return { score: Math.round(4 + value / 10), label: 'Medium' };
  if (value < 80) return { score: Math.round(6 + value / 40), label: 'High' };
  return { score: 10, label: 'Very High' };
};

// Helper — convert raw pollen value to percentage (for progress bars, max ~100 grains/m³)
const toPercent = (value, max = 100) => {
  if (!value) return 0;
  return Math.min(Math.round((value / max) * 100), 100);
};

// Main pollen fetch
export const fetchPollenData = async (city) => {
  try {
    const { lat, lon } = await getCityCoordinates(city);

    const response = await axios.get(BASE_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        hourly: 'alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen',
        forecast_days: 7,
        timezone: 'auto',
      },
    });

    const data = response.data.hourly;
    const times = data.time;

    // Get the current hour index
    const now = new Date();
    const currentHourStr = now.toISOString().slice(0, 13); // "2025-03-03T09"
    const currentIndex = times.findIndex((t) => t.startsWith(currentHourStr)) || 0;

    // Current pollen readings
    const treePollen =
      (data.alder_pollen?.[currentIndex] || 0) +
      (data.birch_pollen?.[currentIndex] || 0) +
      (data.olive_pollen?.[currentIndex] || 0);

    const grassPollen = data.grass_pollen?.[currentIndex] || 0;

    const weedPollen =
      (data.mugwort_pollen?.[currentIndex] || 0) +
      (data.ragweed_pollen?.[currentIndex] || 0);

    // Overall score — weighted average leaning on worst type
    const overallRaw = Math.max(treePollen, grassPollen, weedPollen);
    const overall = getPollenLevel(overallRaw);

    // Is pollen rising? Compare current hour to 3 hours ago
    const prevIndex = Math.max(0, currentIndex - 3);
    const prevRaw =
      Math.max(
        (data.alder_pollen?.[prevIndex] || 0) + (data.birch_pollen?.[prevIndex] || 0),
        data.grass_pollen?.[prevIndex] || 0,
        (data.mugwort_pollen?.[prevIndex] || 0) + (data.ragweed_pollen?.[prevIndex] || 0)
      );
    const isTrending = overallRaw > prevRaw;

    // 7-day daily forecast — use noon reading each day
    const daily = [];
    for (let day = 0; day < 7; day++) {
      // Find noon index for this day
      const targetDate = new Date(now);
      targetDate.setDate(targetDate.getDate() + day - 1); // -1 includes yesterday
      const noonStr = targetDate.toISOString().slice(0, 10) + 'T12';
      const noonIndex = times.findIndex((t) => t.startsWith(noonStr));

      if (noonIndex === -1) continue;

      const dayTreePollen =
        (data.alder_pollen?.[noonIndex] || 0) + (data.birch_pollen?.[noonIndex] || 0);
      const dayGrassPollen = data.grass_pollen?.[noonIndex] || 0;
      const dayWeedPollen =
        (data.mugwort_pollen?.[noonIndex] || 0) + (data.ragweed_pollen?.[noonIndex] || 0);
      const dayOverallRaw = Math.max(dayTreePollen, dayGrassPollen, dayWeedPollen);
      const dayOverall = getPollenLevel(dayOverallRaw);

      daily.push({
        day: targetDate.toLocaleDateString('en-GB', { weekday: 'short' }),
        date: targetDate.toDateString(),
        score: parseFloat(dayOverall.score.toFixed(1)),
        label: dayOverall.label,
      });
    }

    return {
      overall: {
        score: parseFloat(overall.score.toFixed(1)),
        label: overall.label,
      },
      types: {
        tree: {
          percentage: toPercent(treePollen),
          raw: treePollen,
          ...getPollenLevel(treePollen),
        },
        grass: {
          percentage: toPercent(grassPollen),
          raw: grassPollen,
          ...getPollenLevel(grassPollen),
        },
        weed: {
          percentage: toPercent(weedPollen),
          raw: weedPollen,
          ...getPollenLevel(weedPollen),
        },
      },
      isTrending,
      trendLabel: isTrending ? 'Rising throughout the day' : 'Stable throughout the day',
      daily,
    };
  } catch (error) {
    console.error('Error fetching pollen data:', error);
    throw error;
  }
};