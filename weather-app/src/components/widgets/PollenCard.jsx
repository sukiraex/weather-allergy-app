import React from "react";

// PollenCard component displays pollen count information with overall level and breakdown by type
function PollenCard({ data }) {

  // Function to get gradient color based on pollen level
  const getPollenGradient = (level) => {
    switch (level) {
      case 'Low':
        return 'linear-gradient(135deg, #59C08D, #4CAF50)';
      case 'Medium':
      case 'Moderate':
        return 'linear-gradient(135deg, #c1cb45, #FFC107)';
      case 'High':
        return 'linear-gradient(135deg, #F4A021, #EA7B7E, #CA448B)';
      case 'Very High':
      case 'Severe':
        return 'linear-gradient(135deg, #D96B6E, #CA448B)';
      default:
        return 'linear-gradient(135deg, #D96B6E, #CA448B)';
    }
  };

  const gradient = data && data.overall ? getPollenGradient(data.overall.label) : 'linear-gradient(135deg, #f7971e, #f857a6)';

  // Show loading state if no data
  if (!data || !data.overall || !data.types) {
    return (
      <div style={{
        background: gradient,
        padding: "20px",
        borderRadius: "20px",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
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
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box",
      color: "white",
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      height: "280px",
      boxShadow: "0 10px 18px rgba(0,0,0,0.12)",
    }}>

      {/* Header with icon and title */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        
        <div style={{
          width: "25px",
          height: "25px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px"
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

      {/* Glass box with score and breakdown */}
      <div style={{
        background: "rgba(255,255,255,0.15)",
        borderRadius: "15px",
        padding: "15px",
        marginTop: "10px"
      }}>

        {/* Overall score */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h1 style={{ margin: 0, fontSize: "30px" }}>
            {data.overall.score}
          </h1>
          <span>
            {data.overall.label.toUpperCase()}
          </span>
        </div>

        {/* Progress bars for each pollen type */}
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

      {/* Trend indicator */}
      <p style={{ marginTop: "10px", fontSize: "12px", opacity: 0.9 }}>
        ↗ {data.trendLabel}
      </p>

    </div>
  );
}

export default PollenCard;