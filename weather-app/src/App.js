import React, { useState } from 'react';
import ForecastWidget from './components/wwidget/wwidget';
import './App.css'; // optional, only if you have it

function App() {
  const [cityInput, setCityInput] = useState('London');
  const [city, setCity] = useState('London');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cityInput.trim()) return;
    setCity(cityInput.trim());
  };

  return (
    <div className="desktop-shell">
      <div className="desktop-left">
        <ForecastWidget city={city} />
      </div>

      <div className="desktop-right">
        <form onSubmit={handleSubmit} className="city-form">
          <label className="city-form__label">
            City:
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="city-form__input"
              placeholder="Enter city name"
            />
          </label>
          <button type="submit" className="city-form__button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;