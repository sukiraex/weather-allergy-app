import WeatherCard from './components/wwidget/wwidget';
import WindWidget from './components/wwidget/widgets/WindWidget';
import HumidityWidget from './components/wwidget/widgets/HumidityWidget';
import UVWidget from './components/wwidget/widgets/UVWidget';
import SunsetWidget from './components/wwidget/widgets/SunsetWidget';

function App() {
  return (
    <div
      style={{
        padding: '36px 32px',
        backgroundColor: '#7eb0d1',
        minHeight: '100vh',
        display: 'flex',
        gap: '28px',
        alignItems: 'flex-start',
        position: 'relative'   // ⭐ 추가
      }}
    >
      <WeatherCard city="London" />

      {/* 오른쪽 아래 위젯 영역 */}
      <div
        style={{
          position: "absolute",
          right: "120px",
          top: "505px",
          width: "448px",
          display: "flex",
          flexDirection: "column",
          gap: "18px"
        }}
      >
        <SunsetWidget />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <WindWidget />
          <HumidityWidget />
          <UVWidget />
        </div>
      </div>

    </div>
  );
}

export default App;