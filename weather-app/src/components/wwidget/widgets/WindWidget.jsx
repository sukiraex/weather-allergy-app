import { useWeather } from "../../hooks/useWeather";

export default function WindWidget({ city = "London" }) {
  const { current, loading, error } = useWeather(city);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <h3>Wind</h3>
      <p>{current.windSpeed} mph</p>
    </div>
  );
}
