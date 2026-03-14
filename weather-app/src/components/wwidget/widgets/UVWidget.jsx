import { useWeather } from "../../../hooks/useWeather";

export default function UVWidget({ city = "London" }) {
  const { current, loading, error } = useWeather(city);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <h3>UV</h3>
      <p>{current.uvIndex}</p>
    </div>
  );
}
