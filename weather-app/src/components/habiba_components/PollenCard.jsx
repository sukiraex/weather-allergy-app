import React from "react";

function PollenCard({ data }) {

  const getPollenGradient = (level) => {
    switch (level) {
      case 'Low':
        return 'linear-gradient(135deg, #59C08D, #4CAF50)';
      case 'Medium':
      case 'Moderate':
        return 'linear-gradient(135deg, #c1cb45, #FFC107)';
      case 'High':
      case 'Very High':
      case 'Severe':
        return 'linear-gradient(135deg, #f7971e, #f857a6)';
      default:
        return 'linear-gradient(135deg, #f7971e, #f857a6)';
    }
  };

  const gradient = data && data.overall ? getPollenGradient(data.overall.label) : 'linear-gradient(135deg, #f7971e, #f857a6)';

  if (!data || !data.overall || !data.types) {
    return (
      <div style={{
        background: gradient,
        padding: "20px",
        borderRadius: "20px",
        width: "320px",
        color: "white"
      }}>
        Loading pollen...
      </div>
    );
  }

    return (
    <div style={{
      background: gradient,
      padding: "20px",
      borderRadius: "20px",
      width: "320px",
      color: "white"
    }}>

      {/* header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        
        <div style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px"
        }}>
          ✿
        </div>

        <div>
          <p style={{ margin: 0, fontWeight: "600" }}>Pollen Count</p>
          <span style={{ fontSize: "12px", opacity: 0.8 }}>
            {data.overall.label} levels
          </span>
        </div>

      </div>

      {/* glass box */}
      <div style={{
        background: "rgba(255,255,255,0.15)",
        borderRadius: "15px",
        padding: "15px",
        marginTop: "10px"
      }}>

        {/* score */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h1 style={{ margin: 0, fontSize: "32px" }}>
            {data.overall.score}
          </h1>
          <span>
            {data.overall.label.toUpperCase()}
          </span>
        </div>

        {/* bars */}
        {["tree", "grass", "weed"].map((type) => (
          <div key={type} style={{ marginTop: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ opacity: 0.9 }}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
              <span>{data.types[type].percentage}%</span>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.3)",
              height: "6px",
              borderRadius: "10px"
            }}>
              <div style={{
                width: `${data.types[type].percentage}%`,
                background: "rgba(255,255,255,0.9)",
                height: "100%",
                borderRadius: "10px"
              }} />
            </div>
          </div>
        ))}

      </div>

      {/* trend */}
      <p style={{ marginTop: "15px", fontSize: "12px", opacity: 0.9 }}>
        ↗ {data.trendLabel}
      </p>

    </div>
  );
}

export default PollenCard;