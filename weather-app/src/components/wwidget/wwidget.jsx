import { useWeather } from '../../hooks/useWeather';
import { usePollen } from '../../hooks/usePollen';

// Hardcoded colours — replace with var(--variable) once theme file is ready
const colors = {
  cardBg: '#deeaf5',
  forecastRowBg: 'rgba(255,255,255,0.5)',
  textPrimary: '#1a2e42',
  textSecondary: '#4a6580',
  textMuted: '#7a95aa',
  white: '#ffffff',
  rainBlue: '#4a90d9',
  pollenLow: '#22c55e',
  pollenMedium: '#f97316',
  pollenHigh: '#ef4444',
  pollenVeryHigh: '#dc2626',
};

const getPollenColor = (label) => {
  switch (label) {
    case 'Low': return colors.pollenLow;
    case 'Medium': return colors.pollenMedium;
    case 'High': return colors.pollenHigh;
    case 'Very High': return colors.pollenVeryHigh;
    default: return colors.textMuted;
  }
};

const WeatherIcon = ({ icon, size = 40 }) => (
  <img
    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
    alt="weather icon"
    width={size}
    height={size}
    style={{ display: 'block' }}
  />
);

export default function WeatherCard({ city = 'London' }) {
  const { current, hourly, daily, loading: wLoading, error: wError } = useWeather(city);
  const { daily: pollenDaily, loading: pLoading } = usePollen(city);

  if (wLoading || pLoading) return (
    <div style={styles.card}>
      <p style={{ color: colors.textSecondary, padding: '20px' }}>Loading...</p>
    </div>
  );

  if (wError) return (
    <div style={styles.card}>
      <p style={{ color: '#ef4444', padding: '20px' }}>{wError}</p>
    </div>
  );

  return (
    <div style={styles.card}>

      {/* Current Weather */}
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

      {/* Hourly Forecast */}
      <div style={styles.hourlyRow}>
        {hourly.map((h, i) => (
          <div key={i} style={styles.hourlyItem}>
            <span style={styles.hourlyTime}>{h.time}</span>
            <WeatherIcon icon={h.icon} size={28} />
            <span style={styles.hourlyTemp}>{h.temperature}°</span>
          </div>
        ))}
      </div>

      {/* 7-Day Forecast */}
      <div style={styles.forecastSection}>
        <div style={styles.forecastHeader}>
          <span style={styles.forecastTitle}>7-Day Forecast</span>
          <span style={styles.forecastSubtitle}>Weather & Pollen Levels</span>
        </div>

        {daily.map((day, i) => {
          const pollen = pollenDaily?.[i];
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
    backgroundColor: '#dce8f0',
    borderRadius: '24px',
    padding: '20px',
    width: '340px',
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  },
  currentSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
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
    backgroundColor: '#4a8db5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperature: {
    fontSize: '56px',
    fontWeight: '300',
    color: '#1a2e42',
    lineHeight: 1,
    letterSpacing: '-2px',
  },
  condition: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#1a2e42',
    textTransform: 'capitalize',
    marginTop: '4px',
  },
  hiLow: {
    fontSize: '13px',
    color: '#4a6580',
    marginTop: '2px',
  },
  hourlyRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0px',
    marginBottom: '16px',
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
    color: '#4a6580',
    fontWeight: '500',
  },
  hourlyTemp: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1a2e42',
  },
  forecastSection: {
    backgroundColor: '#5a8fab',
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
    color: '#ffffff',
  },
  forecastSubtitle: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.7)',
    marginTop: '2px',
  },
  forecastRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 12px',
    borderRadius: '14px',
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginBottom: '6px',
    flexWrap: 'wrap',
  },
  forecastDay: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
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
    color: '#ffffff',
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
    marginTop: '2px',
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