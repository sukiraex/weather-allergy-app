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
    <div style={{
      padding: '20px',
      fontFamily: 'monospace',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      minHeight: '100vh',
      transition: 'background-color 0.3s, color 0.3s'
    }}>
 
      {/* header (location, time, theme toggle) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
 
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
 
      {/* widgets of the weather app - 3 column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr', gridTemplateRows: 'auto auto', gap: '20px', marginBottom: '40px' }}>
        
        {/* Left column - Weather Card spans 2 rows */}
        <div style={{ gridRow: 'span 2', height: '100%' }}>
          <WeatherCard city={displayCity || "London"} />
        </div>

        {/* Center column - Pollen Card */}
        <div style={{ height: '100%' }}>
          <PollenCard
            data={{
              overall,
              types,
              trendLabel
            }}
          />
        </div>

        {/* Right column - Medication Reminder */}
        <div style={{ height: '100%' }}>
          <MedicationReminder pollenLevel={overall?.label} />
        </div>

        {/* Center column - Symptom Tracker */}
        <div style={{ height: '100%' }}>
          <SymptomTracker city={displayCity || "London"} pollenLevel={overall?.label} />
        </div>

        {/* Right column - Sunset and Small Widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
          <SunsetWidget city={displayCity || "London"} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px' }}>
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