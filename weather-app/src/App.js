import WeatherCard from './components/wwidget/wwidget';
import SymptomTracker from './components/wwidget/Symptoms';

function App() {
  return (
    <><div style={{ padding: '40px', backgroundColor: '#b8d4e8', minHeight: '100vh' }}>
      <WeatherCard city="London" />
    </div><SymptomTracker /></>

  );
}

export default App;