import { useWeather } from "../../../hooks/useWeather";

export default function SunsetWidget({ city = "London" }) {
  const { current, loading, error } = useWeather(city);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const sunsetDate = new Date(current.sunset * 1000);
  const hours = String(sunsetDate.getHours()).padStart(2, "0");
  const minutes = String(sunsetDate.getMinutes()).padStart(2, "0");
  const sunsetTime = `${hours}:${minutes}`;

  return (
    <div style={styles.outerCard}>
      <div style={styles.innerCard}>
        <div style={styles.topRow}>
          <div style={styles.titleWrap}>
            <div style={styles.sunsetIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 4V8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 16H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path
                  d="M6 16C6 12.6863 8.68629 10 12 10C15.3137 10 18 12.6863 18 16"
                  stroke="white"
                  strokeWidth="2"
                />
                <path d="M7 7L9 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M17 7L15 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <div style={styles.title}>Don&apos;t miss the sunset</div>
          </div>

          <div style={styles.time}>{sunsetTime}</div>
        </div>

        <div style={styles.subtitle}>Sunset will be at {sunsetTime}</div>

        <div style={styles.dots}>
          <span style={styles.dot}></span>
          <span style={styles.dot}></span>
          <span style={styles.dot}></span>
          <span style={styles.activeDot}></span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  outerCard: {
    width: "448px",
    height: "200px",
    backgroundColor: "#dbe7f1",
    borderRadius: "30px",
    padding: "18px",
    boxSizing: "border-box",
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
    flexShrink: 0,
  },

  innerCard: {
    width: "100%",
    height: "100%",
    backgroundColor: "#73a9cf",
    borderRadius: "24px",
    boxSizing: "border-box",
    padding: "24px 28px 22px 28px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "#ffffff",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
  },

  titleWrap: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: 0,
  },

  sunsetIcon: {
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  title: {
    fontSize: "18px",
    fontWeight: "500",
    lineHeight: "1.2",
    whiteSpace: "nowrap",
  },

  time: {
    fontSize: "34px",
    fontWeight: "700",
    lineHeight: "1",
    flexShrink: 0,
  },

  subtitle: {
    fontSize: "15px",
    fontWeight: "400",
    color: "rgba(255,255,255,0.95)",
    marginTop: "2px",
  },

  dots: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    marginTop: "2px",
  },

  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "999px",
    backgroundColor: "rgba(255,255,255,0.38)",
  },

  activeDot: {
    width: "30px",
    height: "12px",
    borderRadius: "999px",
    backgroundColor: "#ffffff",
  },
};