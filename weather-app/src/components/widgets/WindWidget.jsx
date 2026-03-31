import { useWeather } from "../../hooks/useWeather";

export default function WindWidget({ city = "London" }) {
  const { current, loading, error } = useWeather(city);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div style={styles.card}>
      <div style={styles.icon}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 8H14C16.2091 8 18 6.20914 18 4C18 1.79086 16.2091 0 14 0" stroke="var(--widget-icon)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M3 12H19C20.6569 12 22 13.3431 22 15C22 16.6569 22 18 19 18C17.3431 18 16 16.6569 16 15" stroke="var(--widget-icon)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M3 16H10" stroke="var(--widget-icon)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      <div style={styles.value}>{current.windSpeed}mph</div>
      <div style={styles.label}>Wind</div>
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