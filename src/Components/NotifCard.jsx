import React from "react";
import { formatPersianDateTime } from "../utils/formatters";

const NotifCard = ({ notif }) => {
  const vdpUrl = notif.listing?.link;
  const text = notif.text.replace(vdpUrl, "");
  return (
    <div className="notif-card">
      <div className="notif-card-row">
        <span className="notif-card-title">{text || notif.title || notif.text || notif.message || "-"}</span>
        {notif.listing?.link && (
          <a className="notif-card-link" href={vdpUrl} target="_blank" rel="noopener noreferrer">
            مشاهده
          </a>
        )}
      </div>
      <div className="notif-card-row notif-card-date-row">
        <span className="notif-card-date">
          {notif.createdAt ? formatPersianDateTime(notif.createdAt) : "-"}
        </span>
      </div>
    </div>
  );
};

export default NotifCard;
