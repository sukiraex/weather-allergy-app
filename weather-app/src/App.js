import WeatherCard from './components/wwidget/wwidget';
import WindWidget from './components/wwidget/widgets/WindWidget';
import HumidityWidget from './components/wwidget/widgets/HumidityWidget';
import UVWidget from './components/wwidget/widgets/UVWidget';
import SunsetWidget from './components/wwidget/widgets/SunsetWidget';

function App() {
  return (
    <div style={{ padding: '40px', backgroundColor: '#b8d4e8', minHeight: '100vh' }}>
      <WeatherCard city="London" />

      <SunsetWidget />
      <WindWidget />
      <HumidityWidget />
      <UVWidget />  
    </div>
  );
}

export default App;
