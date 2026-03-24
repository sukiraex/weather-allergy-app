// displays the local time and date for the location

export default function LocalTime({ localTime, displayCity }) {
  if (!localTime) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
          {displayCity ? `Loading time for ${displayCity}...` : 'No location set'}
        </p>
      </div>
    );
  }

  // localTime looks like "Sat 21 Mar · 00:00"
  // using · to split time and date 
  const [datePart, timePart] = localTime.split('·').map(s => s.trim());

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ margin: 0, fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
        {timePart}
      </p>
      <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
        {datePart} · {displayCity}
      </p>
    </div>
  );
}
