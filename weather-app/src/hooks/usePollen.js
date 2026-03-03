import { useState, useEffect } from 'react';
import { fetchPollenData } from '../api/pollenapi';

// ─── usePollen ─────────────────────────────────────────────────────────────────
// Returns all pollen data needed across the app.
//
// Usage:
//   const { overall, types, trendLabel, daily, loading, error } = usePollen('London')
//
// Shape of returned data:
//
// overall: {
//   score: number,         // 0-10 e.g. 8.2
//   label: string,         // "Low" | "Medium" | "High" | "Very High"
// }
//
// types: {
//   tree: {
//     percentage: number,  // 0-100 for progress bar
//     score: number,
//     label: string,
//   },
//   grass: {
//     percentage: number,
//     score: number,
//     label: string,
//   },
//   weed: {
//     percentage: number,
//     score: number,
//     label: string,
//   },
// }
//
// isTrending: boolean      // true if pollen is rising
// trendLabel: string       // e.g. "Rising throughout the day"
//
// daily: Array of {
//   day: string,           // e.g. "Mon"
//   date: string,
//   score: number,
//   label: string,
// }
//
// loading: boolean
// error: string | null

export const usePollen = (city) => {
  const [overall, setOverall] = useState(null);
  const [types, setTypes] = useState(null);
  const [isTrending, setIsTrending] = useState(false);
  const [trendLabel, setTrendLabel] = useState('');
  const [daily, setDaily] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPollenData(city);

        setOverall(data.overall);
        setTypes(data.types);
        setIsTrending(data.isTrending);
        setTrendLabel(data.trendLabel);
        setDaily(data.daily);
      } catch (err) {
        setError('Failed to load pollen data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [city]);

  return { overall, types, isTrending, trendLabel, daily, loading, error };
};