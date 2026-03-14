import WeatherCard from './components/wwidget/wwidget';
import SymptomTracker from './components/wwidget/Symptoms';

function App() {
  return (
    <><div style={{ padding: '40px', backgroundColor: '#b8d4e8', minHeight: '100vh', display: 'flex', justifyContent:'left', gap: '50px'}}>
      <WeatherCard city="London" />
      <div style={{bottom: 0 }}>
      <SymptomTracker />
      </div>
     
    </div></>

  );
}

export default App;