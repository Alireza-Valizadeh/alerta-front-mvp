// src/components/AlarmCard.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiEdit,
  FiTag,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiDroplet,
  FiZap,
  FiShield,
  FiCpu,
  FiLayers,
  FiGitMerge,
  FiChevronUp,
  FiChevronDown,
  FiTrash2,
} from "react-icons/fi"; // Using react-icons
import "../styles/AlarmCard.css"; // We'll create this CSS file

// Helper to display a range or a single value nicely
const formatRange = (min, max, unit = "", prefix = "") => {
  if (min && max) {
    if (min === max) return `${prefix}${min}`;
    return `${prefix}از ${min} تا ${max}`;
  }
  if (min) return `${prefix}حداقل ${min}`;
  if (max) return `${prefix}حداکثر ${max}`;
  return unit ? `نامشخص ${unit}` : "نامشخص";
};

// Helper to display multiple selected items (like colors)
const formatMultiSelect = (items) => {
  if (!items || items.length === 0) return "نامشخص";
  return items.map((item) => item.title).join("، ");
};

const AlarmCard = ({ alarm, onDeleteAlarm }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const handleEdit = (e) => {
    e.stopPropagation();
    navigate("/app/alarms/edit", { state: { alarmToEdit: alarm } });
  };

  // A simple generated name if one isn't provided
  const alarmName = alarm.name || ` ${alarm.model?.title || "خودرو"} (${alarm.city?.title || "شهرهای مختلف"})`;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDeleteAlarm(alarm.id);
  };

  const additionalDetails = [
    { label: "رنگ بدنه", value: formatMultiSelect(alarm.colors), icon: <FiDroplet className="alarm-detail-icon" /> },
    { label: "نوع سوخت", value: formatMultiSelect(alarm.fuelTypes), icon: <FiZap className="alarm-detail-icon" /> },
    {
      label: "وضعیت شاسی",
      value: formatMultiSelect(alarm.chassisStates),
      icon: <FiShield className="alarm-detail-icon" />,
    },
    {
      label: "وضعیت موتور",
      value: formatMultiSelect(alarm.engineStates),
      icon: <FiCpu className="alarm-detail-icon" />,
    },
    {
      label: "وضعیت بدنه",
      value: formatMultiSelect(alarm.bodyStates),
      icon: <FiLayers className="alarm-detail-icon" />,
    },
    { label: "گیربکس", value: formatMultiSelect(alarm.gearboxes), icon: <FiGitMerge className="alarm-detail-icon" /> },
  ];

  return (
    <div className={`alarm-card ${isExpanded ? "expanded" : ""}`} onClick={toggleExpand}>
      <div className="alarm-card-header">
        {/* Action Icons - Upper Left (visually top-right in RTL) */}
        <div className="alarm-card-actions">
          <button onClick={handleEdit} className="action-icon-button edit-button" aria-label="ویرایش هشدار">
            <FiEdit />
          </button>
          <button onClick={handleDelete} className="action-icon-button delete-button" aria-label="حذف هشدار">
            <FiTrash2 color="red" enableBackground={"true"} />
          </button>
          <button
            onClick={toggleExpand}
            className="action-icon-button expand-button"
            aria-label={isExpanded ? "بستن جزئیات" : "جزئیات بیشتر"}
            aria-expanded={isExpanded}
          >
            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>
        <h3>{alarmName}</h3>
      </div>
      <div className="alarm-card-body">
        <div className="alarm-detail-item">
          <FiTag className="alarm-detail-icon" />
          <span>
            <strong>برند و مدل:</strong>
            {alarm.model?.title || "نامشخص"}
          </span>
        </div>
        <div className="alarm-detail-item">
          <FiMapPin className="alarm-detail-icon" />
          <span>
            <strong>موقعیت:</strong> {alarm.state?.title || "نامشخص"} - {alarm.city?.title || "نامشخص"}
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

        {/* Expanded section */}
        <div className={`alarm-card-expanded-details ${isExpanded ? "open" : ""}`}>
          {additionalDetails.map((detail, index) =>
            // Only render if the value is not "نامشخص" or if you always want to show the title
            detail.value && detail.value !== "نامشخص" ? (
              <div key={index} className="alarm-detail-item">
                {detail.icon}
                <span>
                  <strong>{detail.label}:</strong> {detail.value}
                </span>
              </div>
            ) : null
          )}
        </div>
      </div>
      {/* <div className="alarm-card-footer">
        <button onClick={handleEdit} className="alarm-card-edit-button">
          <FiEdit /> ویرایش هشدار
        </button>
      </div> */}
    </div>
  );
};

export default AlarmCard;
