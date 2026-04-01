import React, { useState } from "react";

// MedicationReminder component allows users to manage daily medications with reminders
function MedicationReminder({ pollenLevel }) {
  // Function to get gradient color based on pollen level
  const getPollenGradient = (level) => {
    switch (level) {
      case 'Low':
        return 'linear-gradient(90deg, #59C08D, #4CAF50)';
      case 'Medium':
      case 'Moderate':
        return 'linear-gradient(90deg, #c1cb45, #FFC107)';
      case 'High':
        return 'linear-gradient(90deg, #F4A021, #EA7B7E, #CA448B)';
      case 'Very High':
      case 'Severe':
        return 'linear-gradient(90deg, #D96B6E, #CA448B)';
      default:
        return 'linear-gradient(90deg, #D96B6E, #CA448B)';
    }
  };

  const gradient = getPollenGradient(pollenLevel);
  // State for list of medications
  const [meds, setMeds] = useState([]);
  // State for add medication form
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [time, setTime] = useState("");

  // Function to toggle medication as taken
  const toggleTaken = (id) => {
    setMeds(meds.map(m =>
      m.id === id ? { ...m, taken: !m.taken } : m
    ));
  };

  // Function to remove a medication
  const removeMed = (id) => {
    setMeds(meds.filter(m => m.id !== id));
  };

  // Function to add a new medication
  const addMed = () => {
    if (!name || !dose || !time) return;

    const newMed = {
      id: Date.now(),
      name,
      dose,
      time,
      taken: false
    };

    setMeds([...meds, newMed]);
    setName("");
    setDose("");
    setTime("");
    setShowForm(false);
  };

  // Calculate progress and next dose
  const takenCount = meds.filter(m => m.taken).length;
  const progress = meds.length ? (takenCount / meds.length) * 100 : 0;
  const nextDose = meds.find(m => !m.taken);

  return (
    <div style={{
      background: "var(--widget-bg)",
      padding: "18px",
      borderRadius: "24px",
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box",
      color: "var(--widget-text)",
      alignSelf: "start",
      boxShadow: "0 10px 18px rgba(0,0,0,0.12)",
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>

      {/* Header with add button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            💊
          </div>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "500", color: "var(--widget-text)", fontFamily: "inherit" }}>Medication</h3>
        </div>

        <button
          onClick={() => setShowForm(true)}
          style={{
            background: gradient,
            border: "none",
            borderRadius: "50%",
            width: "34px",
            height: "34px",
            color: "white",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          +
        </button>
      </div>

      {/* Progress bar */}
      <p style={{ fontSize: "12px", margin: "6px 0", opacity: 0.8 }}>
        {takenCount}/{meds.length} taken today
      </p>

      <div style={{
        background: "var(--widget-bg)",
        height: "6px",
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: "12px"
      }}>
        <div style={{
          width: `${progress}%`,
          background: gradient,
          height: "100%"
        }} />
      </div>

      {/* Medication list or empty state */}
      {meds.length === 0 ? (
        <div style={{
          background: "var(--symptom-warning-bg)",
          border: "1px solid var(--symptom-warning-border)",
          borderRadius: "14px",
          padding: "24px 16px",
          textAlign: "center",
          marginBottom: "10px"
        }}>
          <p style={{ margin: "0 0 6px 0", fontSize: "13px", fontWeight: "600", color: "var(--widget-text)" }}>
            No medication data
          </p>
          <p style={{ margin: 0, fontSize: "12px", opacity: 0.6, color: "var(--widget-text)" }}>
            Please enter your medications for today
          </p>
        </div>
      ) : (
        <>
          {/* List of medications */}
          {meds.map(m => (
            <div key={m.id} style={{
              background: "var(--bg-input)",
              padding: "12px",
              borderRadius: "14px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: m.taken ? 0.6 : 1
            }}>
              <div>
                <p style={{ margin: 0, fontSize: "13px" }}>{m.name}</p>
                <span style={{ fontSize: "12px", opacity: 0.7 }}>{m.dose}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "12px", opacity: 0.7 }}>
                  🕒 {formatTime(m.time)}
                </span>

                <button onClick={() => removeMed(m.id)} style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer"
                }}>
                  ✕
                </button>

                <button onClick={() => toggleTaken(m.id)} style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: "2px solid #666",
                  background: m.taken ? "#4caf50" : "transparent",
                  cursor: "pointer"
                }} />
              </div>
            </div>
          ))}

          {/* Next dose reminder */}
          {nextDose ? (
            <div style={{
              background: "var(--symptom-warning-bg)",
              border: "1px solid var(--symptom-warning-border)",
              borderRadius: "14px",
              marginTop: "10px"
            }}>
              <div style={{ padding: "10px", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "14px" }}>🔔</span>
                  <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--widget-text)" }}>Next Dose</label>
                </div>
                <label style={{ fontSize: "12px", fontWeight: "400", marginLeft: "20px", color: "var(--widget-text)" }}>
                  The {nextDose.name} at {formatTime(nextDose.time)}
                </label>
              </div>
            </div>
          ) : (
            <div style={{
              background: "var(--medication-taken-bg)",
              border: "1px solid var(--medication-taken)",
              padding: "12px",
              borderRadius: "14px",
              marginTop: "10px"
            }}>
              <p style={{ margin: 0, fontSize: "12px", color: "#4CAF50" }}>✓ All medications taken</p>
              <p style={{ margin: 0, color: "var(--widget-text)", fontSize: "13px" }}>
                No more medication today
              </p>
            </div>
          )}
        </>
      )}

      {/* Add medication modal */}
      {showForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999
        }}>
          <div style={{
            background: 'var(--widget-bg)',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '360px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>

            {/* Modal header */}
            <div style={{
              background: gradient,
              padding: "16px",
              color: "white",
              display: "flex",
              alignItems: "center"
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0 }}>Add Medication</h3>
                <p style={{ margin: 0, fontSize: '13px', opacity: 0.85 }}>
                  Set up a reminder
                </p>
              </div>

              <button onClick={() => setShowForm(false)} style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer'
              }}>
                ✕
              </button>
            </div>

            {/* Modal content */}
            <div style={{
              padding: '20px',
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              flex: 1,
              overflowY: 'auto',
              color: 'var(--widget-text)'
            }}>
              <label style={{ fontSize: "13px", opacity: 0.8 }}>Medication Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Cetirizine, Nasal Spray"
                style={{ padding: '14px', borderRadius: '14px', border: "none", background: 'var(--bg-input)', color: 'var(--widget-text)' }} />

              <label style={{ fontSize: "13px", opacity: 0.8 }}>Dosage</label>
              <input value={dose} onChange={e => setDose(e.target.value)} placeholder="e.g., 10mg, 2 sprays, 1 drop"
                style={{ padding: '14px', borderRadius: '14px', border: "none", background: 'var(--bg-input)', color: 'var(--widget-text)' }} />

              <label style={{ fontSize: "13px", opacity: 0.8 }}>Time</label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)}
                style={{ padding: '14px', borderRadius: '14px', border: "none", background: 'var(--bg-input)', color: 'var(--widget-text)' }} />

              <div>
                <p style={{ fontSize: '13px', marginBottom: '10px' }}>
                  Common Allergy Medications
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px'
                }}>
                  {["Cetirizine", "Loratadine", "Nasal Spray", "Eye Drops"].map(item => (
                    <button
                      key={item}
                      onClick={() => setName(item)}
                      style={{
                        padding: '10px',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'var(--bg-input)',
                        color: 'var(--widget-text)',
                        cursor: 'pointer'
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div style={{
              display: "flex",
              gap: "12px",
              padding: '16px',
              borderTop: '1px solid var(--bg-input)'
            }}>
              <button onClick={() => setShowForm(false)} style={{
                flex: 1,
                padding: '12px',
                borderRadius: '14px',
                border: "none",
                background: 'var(--bg-input)',
                color: 'var(--widget-text)',
                cursor: 'pointer'
              }}>
                Cancel
              </button>

              <button onClick={addMed} style={{
                flex: 1,
                padding: '12px',
                borderRadius: '14px',
                border: "none",
                background: gradient,
                color: 'white',
                cursor: 'pointer'
              }}>
                Add Medication
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

// Function to format time from 24-hour to 12-hour format
function formatTime(time) {
  const [h, m] = time.split(":");
  const hour = Number(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${m} ${ampm}`;
}

export default MedicationReminder;
