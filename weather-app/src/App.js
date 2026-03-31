import { useState, useEffect } from 'react'; 
import { useWeather } from './hooks/useWeather';
import { usePollen } from './hooks/usePollen';

// colour variables
import { COLOURS } from "./theme/colours";

// widgets
import WeatherCard from './components/wwidget/wwidget';
import WindWidget from './components/widgets/WindWidget';
import HumidityWidget from './components/widgets/HumidityWidget';
import UVWidget from './components/widgets/UVWidget';
import SunsetWidget from './components/widgets/SunsetWidget';
import SymptomTracker from './components/wwidget/Symptoms';


// header components (location, time, theme toggle)
import LocationBox from './components/header/LocationBox.jsx';
import LocalTime from './components/header/LocalTime.jsx';
import { useTheme } from "./hooks/useTheme"; 
import ThemeToggle from './components/header/ThemeToggle.jsx'; 
import { useLocation } from "./hooks/useLocation";
import { useLocalTime } from "./hooks/useLocalTime";

import PollenCard from './components/habiba_components/PollenCard.jsx';
import MedicationReminder from './components/habiba_components/MedicationReminder.jsx';

// Import responsive layout styles
import './AppLayout.css';
function App() {
  const [locationConfirmed, setLocationConfirmed] = useState(false); // whether the user has confirmed their location (either by allowing geolocation or selecting a suggestion)
 
  const { isDark, toggleTheme, customBg, setCustomBg } = useTheme(); // for theme toggling

  // location to get weather for, and all the related info like suggestions, errors etc
  const {
    location,
    displayCity,
    locationError,
    useManual,
    setUseManual,
    query,
    setQuery,
    suggestions,
    loadingSuggestions,
    selectSuggestion,
  } = useLocation(setLocationConfirmed);
 
  const localTime = useLocalTime(location);  // get the local time for the location (used in header and sunset widget)
  const cleanCity = displayCity
    ? displayCity.split(",")[0].trim()
    : "London";  // default to London while auto-detecting location
  const pollen = usePollen(cleanCity);

  const{
    overall,
    types,
    trendLabel, 
    loading: pollenLoading,
    error: pollenError
  } = pollen;

  return (
    <div className="app-container">
 
      {/* header (location, time, theme toggle) */}
      <div className="header">
 
        <LocationBox
          locationConfirmed={locationConfirmed}
          setLocationConfirmed={setLocationConfirmed}
          displayCity={displayCity}
          locationError={locationError}
          useManual={useManual}
          setUseManual={setUseManual}
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          loadingSuggestions={loadingSuggestions}
          selectSuggestion={selectSuggestion}
        />
 
        <LocalTime localTime={localTime} displayCity={displayCity} />
 
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} customBg={customBg} setCustomBg={setCustomBg} />
 
      </div>
 
      {/* widgets of the weather app - responsive grid layout */}
      <div className="widgets-grid">
        
        {/* Left column - Weather Card spans 2 rows on desktop */}
        <div className="left-column">
          <WeatherCard city={displayCity || "London"} />
        </div>

        {/* Center column - Pollen + Symptom stack */}
        <div className="center-column">
          <PollenCard
            data={{
              overall,
              types,
              trendLabel
            }}
          />

          <SymptomTracker city={displayCity || "London"} pollenLevel={overall?.label} />
        </div>

        

        {/* Right bottom - Sunset and Small Widgets */}
        <div className="right-column">
          <MedicationReminder pollenLevel={overall?.label} />
          <SunsetWidget city={displayCity || "London"} />
          <div className="small-widgets-grid">
            <WindWidget city={displayCity || "London"} />
            <HumidityWidget city={displayCity || "London"} />
            <UVWidget city={displayCity || "London"} />
          </div>
        </div>
      </div>
    </div>  
  );
}
 
export default App;