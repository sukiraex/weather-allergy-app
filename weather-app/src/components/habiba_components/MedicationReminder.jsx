import React, { useState } from "react";

function MedicationReminder() {
  const [meds, setMeds] = useState([
    { id: 1, name: "Cetirizine", dose: "10mg", time: "08:00", taken: true },
    { id: 2, name: "Nasal Spray", dose: "2 sprays", time: "08:30", taken: true },
    { id: 3, name: "Montelukast", dose: "10mg", time: "20:00", taken: false },
    { id: 4, name: "Eye Drops", dose: "1 drop", time: "21:00", taken: false }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [time, setTime] = useState("");

  const toggleTaken = (id) => {
    setMeds(meds.map(m =>
      m.id === id ? { ...m, taken: !m.taken } : m
    ));
  };

  const removeMed = (id) => {
    setMeds(meds.filter(m => m.id !== id));
  };

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

  const takenCount = meds.filter(m => m.taken).length;
  const progress = meds.length ? (takenCount / meds.length) * 100 : 0;
  const nextDose = meds.find(m => !m.taken);

  return (
    <div style={{
      background: "#b8c2cc",
      padding: "18px",
      borderRadius: "25px",
      width: "100%",
      maxWidth: "320px",
      color: "#222",
      alignSelf: "start",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
    }}>

      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          
          {/* pill icon */}
          <div style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "#ffb347",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px"
          }}>
            💊
          </div>

          <h3 style={{ margin: 0, fontSize: "16px" }}>Medication</h3>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: "#ff7a18",
            border: "none",
            borderRadius: "50%",
            width: "34px",
            height: "34px",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            boxShadow: "0 3px 8px rgba(0,0,0,0.2)"
          }}
        >
          +
        </button>
      </div>

      {/* progress bar */}
      <p style={{ fontSize: "12px", margin: "6px 0", opacity: 0.8 }}>
        {takenCount}/{meds.length} taken today
      </p>

      <div style={{
        background: "#dcdfe3",
        height: "6px",
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: "12px"
      }}>
        <div style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #ff7a18, #ffb347)",
          height: "100%",
          borderRadius: "10px"
        }} />
      </div>

      {/* list */}
      {meds.map(m => (
        <div key={m.id} style={{
          background: "#d3dbe3",
          padding: "12px",
          borderRadius: "14px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: m.taken ? 0.6 : 1,
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)"
        }}>

          <div>
            <p style={{ margin: 0, fontWeight: "500" }}>{m.name}</p>
            <span style={{ fontSize: "12px", opacity: 0.7 }}>{m.dose}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

            <span style={{ fontSize: "12px", opacity: 0.7 }}>
              🕒 {formatTime(m.time)}
            </span>

            <button
              onClick={() => removeMed(m.id)}
              style={{
                border: "none",
                background: "transparent",
                color: "#888",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>

            <button
              onClick={() => toggleTaken(m.id)}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                border: "2px solid #666",
                background: m.taken ? "#4caf50" : "transparent",
                cursor: "pointer"
              }}
            />

          </div>

        </div>
      ))}

      {/* next dose */}
      {nextDose && (
        <div style={{
          background: "#f5e6d8",
          padding: "12px",
          borderRadius: "14px",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "3px"
        }}>
          <p style={{ margin: 0, fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            🔔 Next Dose
          </p>
          <p style={{ margin: 0 }}>
            {nextDose.name} at {formatTime(nextDose.time)}
          </p>
        </div>
      )}

      {/* add medicine */}
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
            gap: '12px',
            alignItems: "center",
            zIndex: 999
        }}>
          <div style={{
            background: '#f3f4f6',
            borderRadius: '20px',
            width: '420px',
            maxWidth: '90vw',
            minHeight: '600px',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 15px 40px rgba(0,0,0,0.2)'
          }}>
            {/*header*/}
            <div style={{
              background: "linear-gradient(135deg, #ff7a18, #ff4da6)",
              padding: "16px",
              color: "white",
              display: "flex",
              justifyContent: "centre",
              gap: '12px',
              alignItems: "center"
            }}>
              <div>
                <h3 style={{ margin: 0 }}>Add Medication</h3>
                <p style={{ 
                  margin: '0 0 8px 0',
                  fontSize: '12px', 
                  fontWeight: '600',
                  color: '#1f2937'
                }}>
                    Set up a reminder
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: '18px',
                    cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            {/*inputs*/}
            <div style={{
               padding: '20px',
               display: "flex", 
               flexDirection: "column", 
               gap: "20px",
               flex: 1,
               overflowY: 'auto' 
            }}>
              <input
                placeholder="e.g., Cetirizine, Nasal Spray"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '14px',
                  border: "none",
                  background: '#dbe3ec',
                  outline: 'none',
                  fontSize: '14px'
                }}
             />

             <input 
               placeholder="Dosage"
               value={dose}
               onChange={e => setDose(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '14px',
                  border: "none",
                  background: '#dbe3ec',
                  outline: 'none',
                  fontSize: '14px'
                }}
             />

             <input
               type="time"
               value={time}
               onChange={e => setTime(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '14px',
                  border: "none",
                  background: '#dbe3ec',
                  outline: 'none',
                  fontSize: '14px'
                }}
             />
             </div>

             {/*buttons*/}
             <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
               <button
                 onClick={() => setShowForm(false)}
                 style={{
                    padding: '12px 18px',
                    borderRadius: '14px',
                    border: "none",
                    background: '#e5e7eb',
                    cursor: 'pointer',
                    minWidth: '120px'
                 }}
               >
                 Cancel
               </button>

               <button
                 onClick={addMed}
                 style={{
                    padding: '12px 18px',
                    borderRadius: '14px',
                    border: "none",
                    background: 'linear-gradient(90deg, #ff7a18, #ffb347)',
                    color: 'white',
                    cursor: 'pointer',
                    minWidth: '140px',
                    boxShadow: '0 6px 15px rgba(255,122,24,0.4)'
                 }}
               >
                 Add Medication 
               </button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}

function formatTime(time) {
  const [h, m] = time.split(":");
  const hour = Number(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${m} ${ampm}`;
}

export default MedicationReminder;