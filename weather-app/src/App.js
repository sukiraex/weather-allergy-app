import { useEffect, useState } from 'react';
import { usePollen } from './hooks/usePollen';

// widgets
import WeatherCard from './components/widgets/WeatherWidget';
import WindWidget from './components/widgets/WindWidget';
import HumidityWidget from './components/widgets/HumidityWidget';
import UVWidget from './components/widgets/UVWidget';
import SunsetWidget from './components/widgets/SunsetWidget';
import SymptomTracker from './components/symptomsTracker/Symptoms';


// header components (location, time, theme toggle)
import LocationBox from './components/header/LocationBox.jsx';
import LocalTime from './components/header/LocalTime.jsx';
import { useTheme } from "./hooks/useTheme";
import ThemeToggle from './components/header/ThemeToggle.jsx';
import { useLocation } from "./hooks/useLocation";
import { useLocalTime } from "./hooks/useLocalTime";

import PollenCard from './components/widgets/PollenCard';
import MedicationReminder from './components/widgets/MedicationReminder';

// Main App component that renders the weather and allergy app
function App() {
  // State for location confirmation and mobile responsiveness
  const [locationConfirmed, setLocationConfirmed] = useState(false); // whether the user has confirmed their location (either by allowing geolocation or selecting a suggestion)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900);
  const [activeBottomTab, setActiveBottomTab] = useState('forecast');
  const [isMobilePopupOpen, setIsMobilePopupOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(() => window.innerHeight);

  // Theme management hook
  const { isDark, toggleTheme, customBg, setCustomBg } = useTheme(); // for theme toggling

  // Location management hook - handles geolocation, manual input, suggestions
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
 
  // Local time hook for the selected location
  const localTime = useLocalTime(location);  // get the local time for the location (used in header and sunset widget)
  const cleanCity = displayCity
    ? displayCity.split(",")[0].trim()
    : "London";  // default to London while auto-detecting location
  const pollen = usePollen(cleanCity);

  const{
    overall,
    types,
    trendLabel,
  } = pollen;

  // Effect to handle window resize for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const city = displayCity || "London";

  const pageStyle = {
    padding: isMobile ? '12px' : '20px',
    fontFamily: 'monospace',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    minHeight: isMobile ? '100dvh' : '100vh',
    transition: 'background-color 0.3s, color 0.3s',
    overflow: isMobile ? 'hidden' : 'visible',
  };

  const mobileFrameWidth = 'min(100vw - 16px, 390px)';

  const phoneContainerStyle = {
    width: '100%',
    maxWidth: mobileFrameWidth,
    margin: '0 auto',
    paddingBottom: '0px',
  };

  const bottomBarStyle = {
    position: 'fixed',
    left: '50%',
    transform: 'translate3d(-50%, 0, 0)',
    bottom: '10px',
    width: mobileFrameWidth,
    zIndex: 50,
    borderRadius: '22px',
    background: 'var(--bg-location)',
    border: '1px solid var(--border)',
    boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
    padding: '8px',
    willChange: 'transform',
  };

  const mobileOverlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.45)',
    zIndex: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    boxSizing: 'border-box',
    opacity: isMobilePopupOpen ? 1 : 0,
    pointerEvents: isMobilePopupOpen ? 'auto' : 'none',
    transition: 'opacity 0.18s ease',
  };

  const mobilePopupStyle = {
    width: mobileFrameWidth,
    maxHeight: '70vh',
    overflowY: 'auto',
    borderRadius: '22px',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border)',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25)',
    padding: '10px',
    boxSizing: 'border-box',
  };

  const mobileTabs = [
    { id: 'forecast', label: '7-Day' },
    { id: 'medication', label: 'Medication' },
    { id: 'symptoms', label: 'Symptoms' },
  ];

  const mobileCardsBaseHeight = 620;
  const mobileAvailableHeight = viewportHeight - 230;
  const mobileCardScale = Math.max(0.72, Math.min(1, mobileAvailableHeight / mobileCardsBaseHeight));
  const desktopColumnWidth = '420px';
  const desktopColumnHeight = '790px';

  return (
    <div style={pageStyle}>
 
      {/* Header section with location, time, and theme toggle */}
      <div style={{
        display: 'flex',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '12px',
        marginBottom: isMobile ? '8px' : '10px',
        width: isMobile ? mobileFrameWidth : 'auto',
        marginInline: isMobile ? 'auto' : 0,
      }}>
 
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
 
        <div style={isMobile ? { width: '100%' } : undefined}>
          <LocalTime localTime={localTime} displayCity={displayCity} />
        </div>
 
        {!isMobile && (
          <div>
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} customBg={customBg} setCustomBg={setCustomBg} />
          </div>
        )}
 
      </div>
 
      {/* Mobile layout: scaled cards with bottom tab navigation */}
      {isMobile ? (
        <>
          <div style={phoneContainerStyle}>
            <div style={{ height: `${Math.round(mobileCardsBaseHeight * mobileCardScale)}px`, overflow: 'hidden' }}>
              <div style={{ transform: `scale(${mobileCardScale})`, transformOrigin: 'top center' }}>
                <PollenCard
                  data={{
                    overall,
                    types,
                    trendLabel
                  }}
                />

                <div style={{ marginTop: '14px' }}>
                  <SunsetWidget city={city} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px', marginTop: '10px' }}>
                  <WindWidget city={city} />
                  <HumidityWidget city={city} />
                  <UVWidget city={city} />
                </div>
              </div>
            </div>
          </div>

          <div style={bottomBarStyle}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px', marginBottom: '8px' }}>
              {mobileTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveBottomTab(tab.id);
                    setIsMobilePopupOpen(true);
                  }}
                  style={{
                    border: 'none',
                    borderRadius: '14px',
                    padding: '10px 8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: activeBottomTab === tab.id && isMobilePopupOpen ? '#fff' : 'var(--text-primary)',
                    background: activeBottomTab === tab.id && isMobilePopupOpen ? 'var(--accent)' : 'var(--bg-input)',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              style={{
                width: '100%',
                border: 'none',
                borderRadius: '14px',
                padding: '10px 8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                color: '#fff',
                background: 'var(--accent)',
              }}
            >
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>

          <div style={mobileOverlayStyle} onClick={() => setIsMobilePopupOpen(false)}>
              <div style={mobilePopupStyle} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '8px' }}>
                  <button
                    onClick={() => setIsMobilePopupOpen(false)}
                    style={{
                      border: 'none',
                      background: 'var(--bg-input)',
                      color: 'var(--text-primary)',
                      borderRadius: '10px',
                      padding: '6px 10px',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    Close
                  </button>
                </div>
                <div style={{ display: activeBottomTab === 'forecast' ? 'block' : 'none' }}>
                  <div style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }}>
                    <WeatherCard city={city} />
                  </div>
                </div>
                <div style={{ display: activeBottomTab === 'medication' ? 'block' : 'none' }}>
                  <div style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }}>
                    <MedicationReminder pollenLevel={overall?.label} />
                  </div>
                </div>
                <div style={{ display: activeBottomTab === 'symptoms' ? 'block' : 'none' }}>
                  <div style={{ width: '100%', maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>
                    <SymptomTracker city={city} pollenLevel={overall?.label} />
                  </div>
                </div>
              </div>
            </div>
        </>
        </>
      ) : (
        // Desktop layout: three-column grid with weather, pollen/symptoms, and medication/widgets
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(3, ${desktopColumnWidth})`, columnGap: '40px', justifyContent: 'center', margin: '0 auto 40px' }}>
          {/* Left column - Weather */}
          <div style={{ width: desktopColumnWidth, height: desktopColumnHeight }}>
            <WeatherCard city={city} cardHeight="100%" />
          </div>

          {/* Center column - Pollen + Symptom stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: desktopColumnWidth, height: desktopColumnHeight }}>
            <PollenCard
              data={{
                overall,
                types,
                trendLabel
              }}
            />
            <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
              <SymptomTracker city={city} pollenLevel={overall?.label} cardHeight="100%" />
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16.6px', width: desktopColumnWidth }}>
            <MedicationReminder pollenLevel={overall?.label} />
            <SunsetWidget city={city} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', width: '100%' }}>
              <WindWidget city={city} />
              <HumidityWidget city={city} />
              <UVWidget city={city} />
            </div>
          </div>
        </div>
      )}
    </div>  
  );
}
 
export default App;