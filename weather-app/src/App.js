import WeatherCard from './components/wwidget/wwidget';

function App() {
  return (
    <div style={{ padding: '40px', backgroundColor: '#b8d4e8', minHeight: '100vh' }}>
      <WeatherCard city="London" />
    </div>
  );
}

export default App;