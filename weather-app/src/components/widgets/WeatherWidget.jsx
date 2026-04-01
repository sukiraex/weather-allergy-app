import { useWeather } from '../../hooks/useWeather';
import { usePollen } from '../../hooks/usePollen';

// Colours for weather widget
const colors = {
  cardBg: 'var(--widget-bg)',
  forecastRowBg: 'var(--widget-forecast-bg)',
  textPrimary: 'var(--widget-text)',
  textSecondary: 'var(--widget-subtext)',
  textMuted: 'var(--widget-subtext)',
  white: 'var(--widget-forecast-text)',
  rainBlue: '#49A0C9',
  pollenLow: '#59C08D',
  pollenMedium: '#CFBC73',
  pollenHigh: '#DF9746',
  pollenVeryHigh: '#D96B6E',
};

// Function to get pollen color based on level
const getPollenColor = (label) => {
  switch (label) {
    case 'Low': return colors.pollenLow;
    case 'Medium': return colors.pollenMedium;
    case 'High': return colors.pollenHigh;
    case 'Very High': return colors.pollenVeryHigh;
    default: return colors.textMuted;
  }
};

// Component to render weather icons from OpenWeatherMap
const WeatherIcon = ({ icon, size = 40 }) => (
  <img
    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
    alt="weather icon"
    width={size}
    height={size}
    style={{ display: 'block' }}
  />
);

// WeatherCard component displays current weather, hourly forecast, and 7-day forecast with pollen levels
export default function WeatherCard({ city = 'London', cardHeight = 'auto' }) {
  // Fetch weather and pollen data using custom hooks
  const { current, hourly, daily, loading: wLoading, error: wError } = useWeather(city);
  const { overall: pollenOverall, daily: pollenDaily, loading: pLoading } = usePollen(city);

  // Show loading state while data is fetching
  if (wLoading || pLoading) return (
    <div style={{ ...styles.card, height: cardHeight }}>
      <p style={{ color: colors.textSecondary, padding: '20px' }}>Loading...</p>
    </div>
  );

  // Show error state if weather fetch fails
  if (wError) return (
    <div style={{ ...styles.card, height: cardHeight }}>
      <p style={{ color: '#ef4444', padding: '20px' }}>{wError}</p>
    </div>
  );

  return (
    <div style={{ ...styles.card, height: cardHeight }}>

      {/* Current Weather Section */}
      <div style={styles.currentSection}>
        <div style={styles.currentLeft}>
          <div style={styles.temperature}>{current.temperature}°</div>
          <div style={styles.condition}>{current.description}</div>
          <div style={styles.hiLow}>
            {current.high}° / {current.low}° · Feels like {current.feelsLike}°
          </div>
        </div>
        <div>
          <WeatherIcon icon={current.icon} size={72} />
        </div>
      </div>

      {/* Hourly Forecast Section */}
      <div style={styles.hourlyRow}>
        {hourly.map((h, i) => (
          <div key={i} style={styles.hourlyItem}>
            <span style={styles.hourlyTime}>{h.time}</span>
            <WeatherIcon icon={h.icon} size={39} />
            <span style={styles.hourlyTemp}>{h.temperature}°</span>
          </div>
        ))}
      </div>

      {/* 7-Day Forecast Section with Weather & Pollen Levels */}
      <div style={styles.forecastSection}>
        <div style={styles.forecastHeader}>
          <span style={styles.forecastTitle}>7-Day Forecast</span>
          <span style={styles.forecastSubtitle}>Weather & Pollen Levels</span>
        </div>


        {daily.map((day, i) => {
          // Keep "Today" aligned with the same current-overall score used by PollenCard.
          const pollen = i === 0 ? (pollenOverall || pollenDaily?.[i]) : pollenDaily?.[i];
          const label = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : day.day;

          return (
            <div key={i} style={styles.forecastRow}>
              <span style={styles.forecastDay}>{label}</span>

              {day.rainChance > 0 && (
                <span style={styles.rainChance}>◇ {day.rainChance}%</span>
              )}

              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <WeatherIcon icon={day.icon} size={22} />
              </div>

              <span style={styles.forecastTemps}>
                {day.high}° <span style={{ color: colors.textSecondary, fontWeight: 400 }}>{day.low}°</span>
              </span>

              {pollen && (
                <div style={styles.pollenRow}>
                  <span style={styles.pollenIcon}>⚘</span>
                  <span style={styles.pollenScore}>{pollen.score}</span>
                  <span style={{
                    ...styles.pollenBadge,
                    backgroundColor: getPollenColor(pollen.label),
                  }}>
                    {pollen.label}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: '24px',
    padding: '20px',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    boxShadow: "0 10px 18px rgba(0,0,0,0.12)",
  },
  currentSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
  },
  currentLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  iconCircle: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    backgroundColor: colors.forecastRowBg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperature: {
    fontSize: '56px',
    fontWeight: '300',
    color: colors.textPrimary,
    lineHeight: 1,
    letterSpacing: '-2px',
  },
  condition: {
    fontSize: '18px',
    fontWeight: '500',
    color: colors.textSecondary,
    textTransform: 'capitalize',
    marginTop: '4px',
  },
  hiLow: {
    fontSize: '12px',
    color: colors.textSecondary,
    marginTop: '2px',
  },
  hourlyRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0px',
    marginBottom: '10px',
  },
  hourlyItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    flex: 1,
  },
  hourlyTime: {
    fontSize: '11px',
    color: 'var(--widget-hourly-time)',
    fontWeight: '500',
  },
  hourlyTemp: {
    fontSize: '13px',
    fontWeight: '600',
    color: colors.textPrimary,
  },
  forecastSection: {
    backgroundColor: colors.forecastRowBg,
    borderRadius: '18px',
    padding: '14px',
    display: 'flex',
    flexDirection: 'column', 
    gap: '2px',
  },
  forecastHeader: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  forecastTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: colors.white,
  },
  forecastSubtitle: {
    fontSize: '11px',
    color: 'var(--widget-forecast-muted)',
    marginTop: '2px',
  },
  forecastRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    borderRadius: '14px',
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginBottom: '4.48px',
    flexWrap: 'wrap',
  },
  forecastDay: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.white,
    width: '70px',
    flexShrink: 0,
  },
  rainChance: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.85)',
    width: '45px',
    flexShrink: 0,
  },
  forecastTemps: {
    fontSize: '14px',
    fontWeight: '700',
    color: colors.white,
    flexShrink: 0,
    marginLeft: 'auto',
  },
  forecastLow: {
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '400',
  },
  pollenRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    width: '100%',
    paddingLeft: '4px',
    marginTop: '1px',
  },
  pollenIcon: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.7)',
  },
  pollenScore: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  pollenBadge: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#ffffff',
    padding: '2px 8px',
    borderRadius: '20px',
  },
};