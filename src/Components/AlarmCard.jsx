// src/components/AlarmCard.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdEdit,
  MdLabel,
  MdLocationOn,
  MdCalendarToday,
  MdAttachMoney,
  MdInvertColors,
  MdLocalGasStation,
  MdSecurity,
  MdMemory,
  MdDirectionsCar,
  MdMergeType,
  MdExpandLess,
  MdExpandMore,
  MdDelete,
} from "react-icons/md";
import "../styles/AlarmCard.css"; // We'll create this CSS file
import { getPriceLabel } from "../utils/formatters";

// Helper to display a range or a single value nicely
const formatRange = (min, max, unit = "", prefix = "") => {
  if (min && max) {
    if (min === max) return `${prefix}${min}`;
    return `${prefix}از ${min} تا ${max}`;
  }
  if (min) return `${prefix}حداقل ${min}`;
  if (max) return `${prefix}حداکثر ${max}`;
  return "_"
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
    { label: "رنگ بدنه", value: formatMultiSelect(alarm.colors), icon: <MdInvertColors className="alarm-detail-icon" /> },
    { label: "نوع سوخت", value: formatMultiSelect(alarm.fuelTypes), icon: <MdLocalGasStation className="alarm-detail-icon" /> },
    {
      label: "وضعیت شاسی",
      value: formatMultiSelect(alarm.chassisStates),
      icon: <MdSecurity className="alarm-detail-icon" />,
    },
    {
      label: "وضعیت موتور",
      value: formatMultiSelect(alarm.engineStates),
      icon: <MdMemory className="alarm-detail-icon" />,
    },
    {
      label: "وضعیت بدنه",
      value: formatMultiSelect(alarm.bodyStates),
      icon: <MdDirectionsCar className="alarm-detail-icon" />,
    },
    { label: "گیربکس", value: formatMultiSelect(alarm.gearboxes), icon: <MdMergeType className="alarm-detail-icon" /> },
  ];

  return (
    <div className={`alarm-card ${isExpanded ? "expanded" : ""}`} onClick={toggleExpand}>
      <div className="alarm-card-header">
        {/* Action Icons - Upper Left (visually top-right in RTL) */}
        <div className="alarm-card-actions">
          <button onClick={handleEdit} className="action-icon-button edit-button" aria-label="ویرایش هشدار">
            <MdEdit />
          </button>
          <button onClick={handleDelete} className="action-icon-button delete-button" aria-label="حذف هشدار">
            <MdDelete color="red" />
          </button>
          <button
            onClick={toggleExpand}
            className="action-icon-button expand-button"
            aria-label={isExpanded ? "بستن جزئیات" : "جزئیات بیشتر"}
            aria-expanded={isExpanded}
          >
            {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
          </button>
        </div>
        <h3>{alarmName}</h3>
      </div>
      <div className="alarm-card-body">
        <div className="alarm-detail-item">
          <MdLabel className="alarm-detail-icon" />
          <span className="alarm-detail-label">برند و مدل:</span>
          <span className="alarm-detail-value">{alarm.model?.title || "نامشخص"}</span>
        </div>
        <div className="alarm-detail-item">
          <MdLocationOn className="alarm-detail-icon" />
          <span className="alarm-detail-label">موقعیت:</span>
          <span className="alarm-detail-value">{alarm.state?.title || "نامشخص"} - {alarm.city?.title || "نامشخص"}</span>
        </div>
        <div className="alarm-detail-item">
          <MdAttachMoney className="alarm-detail-icon" />
          <span className="alarm-detail-label">قیمت:</span>
          <span className="alarm-detail-value">
            {alarm.minPrice && alarm.maxPrice
              ? `از ${getPriceLabel(alarm.minPrice)} تا ${getPriceLabel(alarm.maxPrice)}`
              : "نامشخص"}
          </span>
        </div>
        <div className="alarm-detail-item">
          <MdCalendarToday className="alarm-detail-icon" />
          <span className="alarm-detail-label">سال ساخت:</span>
          <span className="alarm-detail-value">{formatRange(alarm.minYear, alarm.maxYear, "سال")}</span>
        </div>

        {/* Expanded section */}
        <div className={`alarm-card-expanded-details ${isExpanded ? "open" : ""}`}>
          {additionalDetails.map((detail, index) =>
            detail.value && detail.value !== "نامشخص" ? (
              <div key={index} className="alarm-detail-item">
                {detail.icon}
                <span className="alarm-detail-label">{detail.label}:</span>
                <span className="alarm-detail-value">{detail.value}</span>
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
