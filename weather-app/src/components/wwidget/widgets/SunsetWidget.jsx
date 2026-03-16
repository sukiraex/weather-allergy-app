import { useWeather } from "../../../hooks/useWeather";

export default function SunsetWidget({ city = "London" }) {
  const { current, loading, error } = useWeather(city);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <h3>Don’t miss the sunset</h3>
      <p>{current.sunset}</p>
      <p>Sunset will be at {current.sunset}</p>
    </div>
  );
}
