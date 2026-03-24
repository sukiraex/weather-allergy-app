import React from "react";

function PollenCard({ data }) {

  if (!data || !data.overall || !data.types) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{
      background: "linear-gradient(135deg, #f7971e, #f857a6)",
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
          <h1 style={{ margin: 0, color: "white", fontSize: "32px" }}>
            {data.overall.score}
          </h1>
          <span style={{ opacity: 0.9 }}>
            {data.overall.label.toUpperCase()}
          </span>
        </div>

        {/* tree */}
        <div style={{ marginTop: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ opacity: 0.9 }}>Tree</span>
            <span>{data.types.tree.percentage}%</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.3)", height: "6px", borderRadius: "10px" }}>
            <div style={{
              width: `${data.types.tree.percentage}%`,
              background: "rgba(255,255,255,0.9)",
              height: "100%",
              borderRadius: "10px"
            }} />
          </div>
        </div>

        {/* grass */}
        <div style={{ marginTop: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ opacity: 0.9 }}>Grass</span>
            <span>{data.types.grass.percentage}%</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.3)", height: "6px", borderRadius: "10px" }}>
            <div style={{
              width: `${data.types.grass.percentage}%`,
              background: "rgba(255,255,255,0.9)",
              height: "100%",
              borderRadius: "10px"
            }} />
          </div>
        </div>

        {/* weed */}
        <div style={{ marginTop: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ opacity: 0.9 }}>Weed</span>
            <span>{data.types.weed.percentage}%</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.3)", height: "6px", borderRadius: "10px" }}>
            <div style={{
              width: `${data.types.weed.percentage}%`,
              background: "rgba(255,255,255,0.9)",
              height: "100%",
              borderRadius: "10px"
            }} />
          </div>
        </div>

      </div>

      {/* trend */}
      <p style={{ marginTop: "15px", fontSize: "12px", opacity: 0.9 }}>
        ↗ {data.trendLabel}
      </p>

    </div>
  );
}

export default PollenCard;