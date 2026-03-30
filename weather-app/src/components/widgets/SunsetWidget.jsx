import { useWeather } from "../../hooks/useWeather";
import { useState, useEffect } from "react";

export default function SunsetWidget({ city = "London" }) {
  const { current, daily, loading, error } = useWeather(city);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sunsetDate = current?.sunset
    ? new Date(current.sunset)
    : null;

  const sunsetTime = sunsetDate
    ? `${String(sunsetDate.getHours()).padStart(2, "0")}:${String(
        sunsetDate.getMinutes()
      ).padStart(2, "0")}`
    : "--:--";

  // Get today's and tomorrow's rain chance
  const todayRainChance = daily && daily[0] ? daily[0].rainChance || 0 : 0;
  const tomorrowRainChance = daily && daily[1] ? daily[1].rainChance || 0 : 0;
  
  // Check if today has no precipitation
  const isNoPrecipitationToday = todayRainChance < 10;
  // Find next no precipitation day
  const nextNoPrecipDay = daily ? daily.find(day => day.rainChance < 10) : null;

  const slides = [
    {
      title: "Don't miss the sunset",
      value: sunsetTime,
      subtitle: `Sunset will be at ${sunsetTime}`,
      icon: (
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
      ),
    },
    {
      title: isNoPrecipitationToday ? "Clear Day Today!" : "Rain Expected",
      value: `${todayRainChance}%`,
      subtitle: isNoPrecipitationToday 
        ? `No rain expected today (${todayRainChance}% chance)`
        : `${todayRainChance}% chance of rain today`,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3C9.23858 3 7 5.23858 7 8C7 10.5 9 12 10.5 13.5C11.5 14.5 12 15.5 12 17"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 3C14.7614 3 17 5.23858 17 8C17 10.5 15 12 13.5 13.5C12.5 14.5 12 15.5 12 17"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M12 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Today's Temperature",
      value: current ? `${current.temperature}°` : "--°",
      subtitle: current ? `Feels like ${current.feelsLike}° today` : "Loading weather data",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 4V14" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="17" r="3" stroke="white" strokeWidth="2" />
          <path d="M9 7H12" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const slide = slides[currentSlide];

  return (
    <div style={styles.outerCard}>
      <div style={styles.innerCard}>
        <div style={styles.topRow}>
          <div style={styles.titleWrap}>
            <div style={styles.sunsetIcon}>{slide.icon}</div>
            <div style={styles.title}>{slide.title}</div>
          </div>

          {slide.value ? <div style={styles.time}>{slide.value}</div> : null}
        </div>

        <div style={styles.subtitle}>{slide.subtitle}</div>

        <div style={styles.dots}>
          {slides.map((_, index) => (
            <span
              key={index}
              style={index === currentSlide ? styles.activeDot : styles.dot}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  outerCard: {
    width: "457px",
    height: "170px",
    backgroundColor: "var(--widget-bg)",
    borderRadius: "30px",
    padding: "14px",
    boxSizing: "border-box",
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
    flexShrink: 0,
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  innerCard: {
    width: "100%",
    height: "100%",
    backgroundColor: "var(--widget-accent)",
    borderRadius: "24px",
    boxSizing: "border-box",
    padding: "24px 28px 22px 28px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "var(--widget-forecast-text)",
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
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "1.2",
    whiteSpace: "nowrap",
  },

  time: {
    fontSize: "30px",
    fontWeight: "700",
    lineHeight: "1",
    flexShrink: 0,
  },

  subtitle: {
    fontSize: "13px",
    fontWeight: "400",
    color: "var(--widget-sunset-subtext)",
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