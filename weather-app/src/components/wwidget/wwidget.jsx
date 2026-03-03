// src/components/ForecastWidget.jsx (for example)
import React from 'react';
import { useWeather } from '../../hooks/useWeather';
import './wwidget.css';

/* ...rest of ForecastWidget component I sent earlier stays the same... */

const getPollenInfo = (rainChance, index) => {
  // Simple, deterministic mapping so it feels consistent without a pollen API.
  // You can replace this with real pollen data later.
  const baseScore = 2 + (index * 0.9) + (rainChance / 30);
  let label = 'Low';
  let tone = 'low';

  if (baseScore >= 8.5) {
    label = 'Very High';
    tone = 'very-high';
  } else if (baseScore >= 6.5) {
    label = 'High';
    tone = 'high';
  } else if (baseScore >= 4) {
    label = 'Medium';
    tone = 'medium';
  }

  return {
    score: baseScore.toFixed(1),
    label,
    tone,
  };
};

const getOpenWeatherIconUrl = (iconCode) =>
  iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : undefined;

export default function ForecastWidget({ city }) {
  const { current, hourly, daily, loading, error } = useWeather(city);

  if (!city) {
    return (
      <div className="forecast-widget">
        <p className="forecast-widget__empty">Choose a city to see the forecast.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="forecast-widget forecast-widget--loading">
        <div className="forecast-widget__spinner" />
        <p className="forecast-widget__status">Loading weather…</p>
      </div>
    );
  }

  if (error || !current) {
    return (
      <div className="forecast-widget forecast-widget--error">
        <p className="forecast-widget__status">
          {error || 'Unable to load weather data.'}
        </p>
      </div>
    );
  }

  const displayCity = current.city || city;
  const todayLabel = 'Today';

  return (
    <section className="forecast-widget" aria-label="Weather forecast">
      {/* Header: current conditions */}
      <header className="forecast-widget__header">
        <div className="forecast-widget__header-main">
          <p className="forecast-widget__temperature">
            {Math.round(current.temperature)}°
          </p>
          <p className="forecast-widget__condition">
            {current.description || current.condition}
          </p>
          <p className="forecast-widget__meta">
            {Math.round(current.high)}° / {Math.round(current.low)}° · Feels like{' '}
            {Math.round(current.feelsLike)}°
          </p>
          <p className="forecast-widget__city">{displayCity}</p>
        </div>

        <div className="forecast-widget__icon-circle" aria-hidden="true">
          {current.icon && (
            <img
              src={getOpenWeatherIconUrl(current.icon)}
              alt={current.condition}
              className="forecast-widget__icon-main"
            />
          )}
        </div>
      </header>

      {/* Hourly strip */}
      {hourly && hourly.length > 0 && (
        <section
          className="forecast-widget__hourly"
          aria-label="Hourly forecast"
        >
          {hourly.slice(0, 6).map((h, idx) => (
            <div key={`${h.time}-${idx}`} className="hourly-chip">
              <p className="hourly-chip__time">{h.time}</p>
              <div className="hourly-chip__icon-wrap">
                {h.icon && (
                  <img
                    src={getOpenWeatherIconUrl(h.icon)}
                    alt={h.condition}
                    className="hourly-chip__icon"
                  />
                )}
              </div>
              <p className="hourly-chip__temp">{Math.round(h.temperature)}°</p>
            </div>
          ))}
        </section>
      )}

      {/* 7‑day forecast */}
      {daily && daily.length > 0 && (
        <section
          className="forecast-panel"
          aria-label="7-day forecast and pollen levels"
        >
          <header className="forecast-panel__header">
            <p className="forecast-panel__title">7-Day Forecast</p>
            <p className="forecast-panel__subtitle">
              Weather &amp; Pollen Levels
            </p>
          </header>

          <div className="forecast-panel__list">
            {daily.slice(0, 7).map((dayItem, index) => {
              const isYesterday = index === 0 && dayItem.day !== todayLabel;
              const isToday = index === 0 || dayItem.day === todayLabel;
              const label = isYesterday ? 'Yesterday' : isToday ? 'Today' : dayItem.day;

              const { score, label: pollenLabel, tone } = getPollenInfo(
                dayItem.rainChance ?? 0,
                index
              );

              return (
                <div
                  key={dayItem.date}
                  className="forecast-row"
                  data-variant={isYesterday ? 'yesterday' : isToday ? 'today' : 'default'}
                >
                  <div className="forecast-row__main">
                    <div className="forecast-row__labels">
                      <p className="forecast-row__day">{label}</p>
                      <p className="forecast-row__detail">
                        Pollen:{' '}
                        <span className={`pill pill--${tone}`}>
                          {score} {pollenLabel}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="forecast-row__meta">
                    <span className="forecast-row__icon-wrap">
                      {dayItem.icon && (
                        <img
                          src={getOpenWeatherIconUrl(dayItem.icon)}
                          alt={dayItem.condition}
                          className="forecast-row__icon"
                        />
                      )}
                    </span>
                    <span className="forecast-row__temps">
                      {Math.round(dayItem.high)}° / {Math.round(dayItem.low)}°
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </section>
  );
}