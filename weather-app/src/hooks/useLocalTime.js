// get the local time at the user's location using the OpenWeather API's timezone 

import { useState, useEffect } from "react";

export function useLocalTime(location) {
  const [localTime, setLocalTime] = useState('');
  const [timezoneOffset, setTimezoneOffset] = useState(null); // offset in seconds

  // get the timezone offset whenever the location changes
  useEffect(() => {
    if (!location) return;

    const fetchTimezone = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
        const data = await res.json();
        // set the timezone offset in seconds (for example 3600 for UTC+1)
        setTimezoneOffset(data.timezone);
      } catch (err) {
        // error in log if timezone fails
        console.error("Timezone fetch error:", err);
        setTimezoneOffset(null);
      }
    };

    fetchTimezone();
  }, [location]);

  // tick every second and format the time using the timezone offset
  useEffect(() => {
    if (timezoneOffset === null) return;

    const tick = () => {
      const now = new Date();

      // UTC time in milliseconds
      const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;

      // local time at destination
      const localMs = utcMs + timezoneOffset * 1000;
      const local = new Date(localMs);

      // use format (Sat 21 Mar · 00:00)
      const dayName = local.toLocaleDateString('en-GB', { weekday: 'short' });
      const day     = local.getDate();
      const month   = local.toLocaleDateString('en-GB', { month: 'short' });
      const hours   = String(local.getHours()).padStart(2, '0');
      const minutes = String(local.getMinutes()).padStart(2, '0');

      setLocalTime(`${dayName} ${day} ${month} · ${hours}:${minutes}`);
    };

    tick(); // run immediately so there's no 1s delay on first render
    const interval = setInterval(tick, 1000);

    // fix for location changes
    return () => clearInterval(interval);
  }, [timezoneOffset]);

  return localTime;
}