import React from "react";

const SettingsCard = ({ icon: Icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      padding: "1.2rem",
      marginBottom: "1.2rem",
      cursor: "pointer",
      transition: "box-shadow 0.2s",
    }}
  >
    <Icon size={32} style={{ marginRight: "1.2rem", color: "#1976d2" }} />
    <div style={{ marginRight: "1.2rem" }}>
      <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{title}</div>
      {description && (
        <div style={{ color: "#666", fontSize: "0.95rem" }}>{description}</div>
      )}
    </div>
  </div>
);

export default SettingsCard;
