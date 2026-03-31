// get the user's location using the Geolocation API get the city name

import { useState, useEffect } from "react";

export function useLocation(setLocationConfirmed) {
  const [location, setLocation] = useState(null);            // { lat, lon }
  const [displayCity, setDisplayCity] = useState('');        // what we show in the header (e.g. "London, UK")
  const [locationError, setLocationError] = useState(null);  // error message if geolocation fails
  const [useManual, setUseManual] = useState(false);         // whether to show the manual search input (if geolocation fails or is denied)

  // autocomplete states
  const [query, setQuery] = useState('');                    // what the user is typing
  const [suggestions, setSuggestions] = useState([]);        // list of places to show
  const [loadingSuggestions, setLoadingSuggestions] = useState(false); // whether we're waiting for suggestions from the API

  // auto-detect location when permission is granted
  useEffect(() => {
    const getUserLocation = async () => {
      if (!navigator.geolocation) {
        setLocationError("Geolocation not supported.");
        setUseManual(true);
        return;
      }

      // try to get the user's location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude; 
          const lon = position.coords.longitude;
          
          // set the location and mark it as confirmed so we can show the weather data
          setLocationConfirmed(true);
          setLocation({ lat, lon });

          try {
            // reverse geocode the lat/lon to get a city name using OpenWeather's Geocoding API
            const geoResponse = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
            );
            // take the first result and set displayCity to "City, Country"
            const geoData = await geoResponse.json();

            // if results come back, show the city and country
            if (geoData && geoData.length > 0) {
              setDisplayCity(geoData[0].name + ", " + geoData[0].country);
            } else {
              setDisplayCity("Unknown location");
            }
          } catch (err) {
            console.error("Reverse geocode error:", err);
            setDisplayCity("Location error");
          }

          setLocationError(null); // clear any previous errors
        },
        (error) => {
          let msg = "Unable to get location.";                      
          if (error.code === error.PERMISSION_DENIED) {            // denied permission
            msg = "Location access denied. Please search below.";
          } else if (error.code === error.POSITION_UNAVAILABLE) {  // position unavailable
            msg = "Location information unavailable.";
          } else if (error.code === error.TIMEOUT) {               // timeout
            msg = "Location request timed out.";
          }
          setLocationError(msg);
          setUseManual(true);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    };

    getUserLocation();
  }, []); 

  // autocomplete suggestion for manual location search
  useEffect(() => {
    // dont search if the query is too short
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    // wait 350ms after the user stops typing before fetching
    const timer = setTimeout(async () => {
      setLoadingSuggestions(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
        const data = await res.json();

        // each result has a name, country, state, lat, lon
        const seen = new Set();
        const unique = data.filter(item => { // filter out any duplicates by lat/lon
          const key = `${item.lat.toFixed(2)},${item.lon.toFixed(2)}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        
        // set the suggestions to the unique results
        setSuggestions(unique);
      } catch (err) {
        console.error("Autocomplete error:", err);
        setSuggestions([]);
      } finally {
        setLoadingSuggestions(false); // stop the loading state
      }
    }, 350);

    // cancel the timer if the user types again before 350ms
    return () => clearTimeout(timer);
  }, [query]);

  // when the user clicks a suggestion from the dropdown
  const selectSuggestion = (suggestion) => {
    const label = suggestion.state
      ? `${suggestion.name}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`;

    setLocation({ lat: suggestion.lat, lon: suggestion.lon });
    setDisplayCity(label);
    setLocationConfirmed(true);
    setQuery('');
    setSuggestions([]);
    setLocationError(null);
  };

  return {
    location,
    displayCity,
    locationError,
    useManual,
    setUseManual,
    setLocation,
    setDisplayCity,
    setLocationError,
    query,
    setQuery,
    suggestions,
    loadingSuggestions,
    selectSuggestion,
  };
}