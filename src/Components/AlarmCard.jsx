// src/components/AlarmCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTag, FiMapPin, FiCalendar, FiDollarSign, FiChevronsLeft } from "react-icons/fi"; // Using react-icons
import "../styles/AlarmCard.css"; // We'll create this CSS file

// Helper to display a range or a single value nicely
const formatRange = (min, max, unit = "", prefix = "") => {
  if (min && max) {
    if (min.value === max.value) return `${prefix}${min.label}`;
    return `${prefix}از ${min.label} تا ${max.label}`;
  }
  if (min) return `${prefix}حداقل ${min.label}`;
  if (max) return `${prefix}حداکثر ${max.label}`;
  return unit ? `نامشخص ${unit}` : "نامشخص";
};

// Helper to display multiple selected items (like colors)
const formatMultiSelect = (items) => {
  if (!items || items.length === 0) return "نامشخص";
  return items.map((item) => item.label).join("، ");
};

const AlarmCard = ({ alarm }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    // Navigate to the AlarmPage (which contains AlarmForm)
    // and pass the alarm data in the state for prefilling.
    // The route for AlarmPage should be something like "/create-alarm" or "/edit-alarm"
    navigate("/alarms/edit", { state: { alarmToEdit: alarm } });
  };

  // A simple generated name if one isn't provided
  const alarmName =
    alarm.name ||
    `${alarm.make?.label || ""} ${alarm.model?.label || "خودرو"} (${alarm.city?.label || "شهرهای مختلف"})`;

  return (
    <div className="alarm-card">
      <div className="alarm-card-header">
        <h3>{alarmName}</h3>
      </div>
      <div className="alarm-card-body">
        <div className="alarm-detail-item">
          <FiTag className="alarm-detail-icon" />
          <span>
            <strong>برند و مدل:</strong> {alarm.make?.label || "نامشخص"} - {alarm.model?.label || "نامشخص"}
          </span>
        </div>
        <div className="alarm-detail-item">
          <FiMapPin className="alarm-detail-icon" />
          <span>
            <strong>موقعیت:</strong> {alarm.state?.label || "نامشخص"} - {alarm.city?.label || "نامشخص"}
          </span>
        </div>
        <div className="alarm-detail-item">
          <FiDollarSign className="alarm-detail-icon" />
          <span>
            <strong>قیمت:</strong> {formatRange(alarm.minPrice, alarm.maxPrice, "تومان")}
          </span>
        </div>
        <div className="alarm-detail-item">
          <FiCalendar className="alarm-detail-icon" />
          <span>
            <strong>سال ساخت:</strong> {formatRange(alarm.minYear, alarm.maxYear, "سال")}
          </span>
        </div>
        {alarm.colors && alarm.colors.length > 0 && (
          <div className="alarm-detail-item">
            <FiChevronsLeft className="alarm-detail-icon" /> {/* Placeholder icon for color */}
            <span>
              <strong>رنگ:</strong> {formatMultiSelect(alarm.colors)}
            </span>
          </div>
        )}
      </div>
      <div className="alarm-card-footer">
        <button onClick={handleEdit} className="alarm-card-edit-button">
          <FiEdit /> ویرایش هشدار
        </button>
        {/* You could add a delete button here as well */}
      </div>
    </div>
  );
};

export default AlarmCard;
