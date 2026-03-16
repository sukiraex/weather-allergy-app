import { useWeather } from "../../../hooks/useWeather";

export default function HumidityWidget({ city = "London" }) {
  const { current, loading, error } = useWeather(city);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <h3>Humidity</h3>
      <p>{current.humidity}%</p>
    </div>
  );
}
