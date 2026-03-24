// everything to do with the location input
// shows the city with a pin icon + edit button
// shows the search input + dropdown suggestions when selecting a new location

import PinIcon from '../icons/PinIcon.jsx'; // pin icon for the user interface

// the LocationBox component handles the location input and display
export default function LocationBox({
  locationConfirmed,    // indicates if the location has been confirmed (true) or is still being detected/edited (false)
  setLocationConfirmed, // function to update the locationConfirmed state
  displayCity,          // the name of the city to display when location is confirmed
  locationError,        // any error message related to location detection
  useManual,            // indicates if the user is manually entering a location (true) or if the app is auto-detecting (false)
  setUseManual,         // function to update the useManual state
  query,                // the current text in the location search input
  setQuery,             // function to update the query state as the user types
  suggestions,          // location suggestions based on the user's entry
  loadingSuggestions,   // indicates if suggestions are loading
  selectSuggestion,     // function to handle suggestion selection
}) {

  return (
    <div className="location-container" style={{ position: 'relative', marginBottom: 0 }}>

      {/* confirm whether location is set or still being detected/edited */}
      {locationConfirmed ? ( 
        <div className="location-confirmed">
          <p className="location-text" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <PinIcon size={14} color="var(--accent)" /> {/* show pin icon next to city name */}
            {displayCity} {/* show the confirmed city */}
          </p>
          <button
            className="edit-location-button"
            /* allow user to edit location by clicking "Edit" button, which resets confirmation and shows the search input */ 
            onClick={() => {
              setLocationConfirmed(false); 
              setUseManual(true);
            }}
          >
            Edit 
          </button>
        </div>
      ) : (

        /* location is not confirmed, show either error/loading message or the search input if user is manually entering location */
        <>
          <p className="location-message">
            {locationError || "Detecting your location..."}
          </p>

          {/* if user is manually entering location, show the search input and suggestions dropdown */}
          {useManual && (
            <div style={{ position: 'relative' }}>
              <div className="location-form">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search city..."
                  className="location-input"
                  autoComplete="off"
                />
                {loadingSuggestions && (
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', alignSelf: 'center' }}>
                    ...
                  </span>
                )}
              </div>

              {/* suggestion list */}
              {suggestions.length > 0 && (
                <ul style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  margin: '4px 0 0 0',
                  padding: 0,
                  listStyle: 'none',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  zIndex: 100,
                  boxShadow: 'var(--shadow)',
                }}>
                  {/* map over suggestions to create a dropdown list, clicking a suggestion calls selectSuggestion to confirm location */}
                  {suggestions.map((s, i) => {
                    const label = s.state
                      ? `${s.name}, ${s.country}` // when searching for location, show name and country in the dropdown suggestions
                      : `${s.name}, ${s.country}`; 
                    return (
                      <li
                        key={i}
                        onClick={() => selectSuggestion(s)} 
                        style={{
                          padding: '10px 14px',
                          fontSize: '13px',
                          cursor: 'pointer',
                          color: 'var(--text-primary)',
                          borderBottom: i < suggestions.length - 1 ? '1px solid var(--border)' : 'none',
                          transition: 'background 0.15s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-input)'} /* highlight suggestion on hover */
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <PinIcon size={12} color="var(--accent)" /> {/* show pin icon next to each suggestion in the dropdown */}
                        {label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </>
      )}

    </div>
  );
}
