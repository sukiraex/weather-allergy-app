import { useWeather } from "../../../hooks/useWeather";

export default function UVWidget({ city = "London" }) {
  const { current, loading, error } = useWeather(city);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const uvValue = current.uvIndex;

  let uvLabel = "Low";
  if (uvValue >= 6) uvLabel = "High";
  else if (uvValue >= 3) uvLabel = "Moderate";

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

      <div style={styles.value}>{uvLabel}</div>
      <div style={styles.label}>UV</div>
    </div>
  );
}

const styles = {
  card: {
    width: "140px",
    height: "136px",
    backgroundColor: "#dbe7f1",
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
    color: "#0f172a",
    lineHeight: "1",
    marginBottom: "10px",
  },

  label: {
    fontSize: "15px",
    color: "#5f7286",
    lineHeight: "1",
  },
};