import React from "react";
import '../styles/SettingsCard.css';

const SettingsCard = ({ icon: Icon, title, description, onClick }) => (
  <div className="settings-card" onClick={onClick}>
    <Icon size={32} className="settings-card-icon" />
    <div className="settings-card-content">
      <div className="settings-card-title">{title}</div>
      {description && (
        <div className="settings-card-description">{description}</div>
      )}
    </div>
  </div>
);

export default SettingsCard;
