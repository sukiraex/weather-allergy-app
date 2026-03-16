import { useState, useEffect } from "react";

export function useLocation(setLocationConfirmed) {
  const [location, setLocation] = useState(null);
  const [displayCity, setDisplayCity] = useState('');
  const [locationError, setLocationError] = useState(null);
  const [useManual, setUseManual] = useState(false);

  useEffect(() => {
    const getUserLocation = async () => {

      if (!navigator.geolocation) {
        setLocationError("Geolocation not supported.");
        setUseManual(true);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          setLocationConfirmed(true);
          setLocation({ lat, lon });

          try {
            const geoResponse = await fetch(
              `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
            );

            const geoData = await geoResponse.json();

            if (geoData && geoData.length > 0) {
              setDisplayCity(geoData[0].name + ", " + geoData[0].country);
            } else {
              setDisplayCity("Unknown location");
            }

          } catch (err) {
            console.error("Reverse geocode error:", err);
            setDisplayCity("Location acquired");
          }

          setLocationError(null);
        },
        (error) => {

          let msg = "Unable to get location.";

          if (error.code === error.PERMISSION_DENIED) {
            msg = "Location access denied. Please allow it or enter manually.";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            msg = "Location information unavailable.";
          } else if (error.code === error.TIMEOUT) {
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

  return {
    location,
    displayCity,
    locationError,
    useManual,
    setUseManual,
    setLocation,
    setDisplayCity,
    setLocationError
  };

}
