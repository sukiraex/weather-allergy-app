import { useWeather } from "../../hooks/useWeather";

export default function HumidityWidget({ city = "London" }) {
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
          <path
            d="M12 2C12 2 6 8.5 6 13C6 16.3137 8.68629 19 12 19C15.3137 19 18 16.3137 18 13C18 8.5 12 2 12 2Z"
            stroke="var(--widget-icon)"
            strokeWidth="2"
          />
          <path
            d="M17 7C17 7 13 11.5 13 14.5C13 16.9853 15.0147 19 17.5 19C19.9853 19 22 16.9853 22 14.5C22 11.5 17 7 17 7Z"
            stroke="var(--widget-icon)"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div style={styles.value}>{current.humidity}%</div>
      <div style={styles.label}>Humidity</div>
    </div>
  );
}

const styles = {
  card: {
    width: "140px",
    height: "136px",
    backgroundColor: "var(--widget-bg)",
    borderRadius: "24px",
    boxShadow: "0 10px 18px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
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