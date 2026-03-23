import WeatherCard from './components/wwidget/wwidget';
import SymptomTracker from './components/wwidget/Symptoms';
import LogSymptoms from './components/wwidget/LogSymptoms';

function App() {
  return (
    <><div style={{ padding: '40px', backgroundColor: '#b8d4e8', minHeight: '100vh', display: 'flex', justifyContent:'left', gap: '90px'}}>
      <WeatherCard city="London" />
      <div style={{bottom: 0 }}>
      <SymptomTracker city="London"/>
 
      </div>
   
     
    </div></>

  );
}

export default App;