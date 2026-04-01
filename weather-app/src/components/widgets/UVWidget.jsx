import { useWeather } from "../../hooks/useWeather";

// UVWidget component displays the UV index level for a given city
export default function UVWidget({ city = "London" }) {
  // Fetch current weather data
  const { current, loading, error } = useWeather(city);

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const uvValue = current.uvIndex;

  // Determine UV label based on index value
  let uvLabel = "Low";
  if (uvValue >= 6) uvLabel = "High";
  else if (uvValue >= 3) uvLabel = "Moderate";

  return (
    <div style={styles.card}>
      {/* UV icon */}
      <div style={styles.icon}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="4.5" stroke="#E7AE17" strokeWidth="2" />
          <path d="M12 1.5V4" stroke="#E7AE17" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 20V22.5" stroke="#E7AE17" strokeWidth="2" strokeLinecap="round" />
          <path d="M1.5 12H4" stroke="#E7AE17" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 12H22.5" stroke="#E7AE17" strokeWidth="2" strokeLinecap="round" />
          <path d="M4.5 4.5L6.2 6.2" stroke="#E7AE17" strokeWidth="2" strokeLinecap="round" />
          <path d="M17.8 17.8L19.5 19.5" stroke="#E7AE17" strokeWidth="2" strokeLinecap="round" />
          <path d="M17.8 6.2L19.5 4.5" stroke="#E7AE17" strokeWidth="2" strokeLinecap="round" />
          <path d="M4.5 19.5L6.2 17.8" stroke="#E7AE17" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* UV level label */}
      <div style={styles.value}>{uvLabel}</div>
      {/* Label */}
      <div style={styles.label}>UV</div>
    </div>
  );
}

const styles = {
  card: {
    width: "100%",
    height: "120px",
    backgroundColor: 'var(--widget-bg)',

    borderRadius: "20px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  icon: {
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },

  value: {
    fontSize: "24px",
    fontWeight: "700",
    color: "var(--widget-text)",
    lineHeight: "1",
    marginBottom: "10px",
  },

  label: {
    fontSize: "15px",
    color: "var(--widget-label)",
    lineHeight: "1",
  },
};