import axios from 'axios';

const BASE_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

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

const getPollenLevel = (value) => {
  if (value === null || value === undefined || value === 0) return { score: 0, label: 'Low' };
  if (value < 10) return { score: parseFloat((value / 1.5).toFixed(1)), label: 'Low' };
  if (value < 30) return { score: parseFloat((4 + value / 10).toFixed(1)), label: 'Medium' };
  if (value < 80) return { score: parseFloat((6 + value / 40).toFixed(1)), label: 'High' };
  return { score: 10, label: 'Very High' };
};

const toPercent = (value, max = 100) => {
  if (!value) return 0;
  return Math.min(Math.round((value / max) * 100), 100);
};

// NEW — instead of looking for noon exactly, average all readings for that day
const getDailyAverage = (values, times, targetDate) => {
  const dateStr = targetDate.toISOString().slice(0, 10); // "2026-03-03"
  
  const dayReadings = times.reduce((acc, time, index) => {
    if (time.startsWith(dateStr) && values[index] !== null) {
      acc.push(values[index]);
    }
    return acc;
  }, []);

  if (dayReadings.length === 0) return 0;
  
  // Use the peak reading of the day rather than average — more realistic for pollen
  return Math.max(...dayReadings);
};

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

    // ── Current readings ──
    const now = new Date();
    const currentHourStr = now.toISOString().slice(0, 13);
    let currentIndex = times.findIndex((t) => t.startsWith(currentHourStr));
    if (currentIndex === -1) currentIndex = 0; // fallback to first entry

    const treePollen =
      (data.alder_pollen?.[currentIndex] || 0) +
      (data.birch_pollen?.[currentIndex] || 0) +
      (data.olive_pollen?.[currentIndex] || 0);
    const grassPollen = data.grass_pollen?.[currentIndex] || 0;
    const weedPollen =
      (data.mugwort_pollen?.[currentIndex] || 0) +
      (data.ragweed_pollen?.[currentIndex] || 0);

    const overallRaw = Math.max(treePollen, grassPollen, weedPollen);
    const overall = getPollenLevel(overallRaw);

    // Trend — compare current to 3 hours ago
    const prevIndex = Math.max(0, currentIndex - 3);
    const prevRaw = Math.max(
      (data.alder_pollen?.[prevIndex] || 0) + (data.birch_pollen?.[prevIndex] || 0),
      data.grass_pollen?.[prevIndex] || 0,
      (data.mugwort_pollen?.[prevIndex] || 0) + (data.ragweed_pollen?.[prevIndex] || 0)
    );
    const isTrending = overallRaw > prevRaw;

    // ── Daily forecast — use PEAK reading per day instead of noon ──
    const daily = [];
    for (let day = 0; day < 7; day++) {
      const targetDate = new Date(now);
      targetDate.setDate(targetDate.getDate() + day); // -1 includes yesterday

      const treeDaily = getDailyAverage(
        (data.alder_pollen || []).map((v, i) => v + (data.birch_pollen?.[i] || 0)),
        times,
        targetDate
      );
      const grassDaily = getDailyAverage(data.grass_pollen || [], times, targetDate);
      const weedDaily = getDailyAverage(
        (data.mugwort_pollen || []).map((v, i) => v + (data.ragweed_pollen?.[i] || 0)),
        times,
        targetDate
      );

      const dayOverallRaw = Math.max(treeDaily, grassDaily, weedDaily);
      const dayOverall = getPollenLevel(dayOverallRaw);

      daily.push({
        day: targetDate.toLocaleDateString('en-GB', { weekday: 'short' }),
        date: targetDate.toDateString(),
        score: dayOverall.score,
        label: dayOverall.label,
      });
    }

    return {
      overall: {
        score: overall.score,
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