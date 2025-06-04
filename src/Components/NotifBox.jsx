import React from "react";
import NotifCard from "./NotifCard";
import "../styles/notif.css";

const NotifBox = ({ notifications, loading, error }) => (
  <div className="notif-box">
    <div className="notif-box-header">اعلان‌های اخیر</div>
    <div className="notif-box-list">
      {loading ? (
        <div className="notif-box-loading">در حال بارگذاری اعلان‌ها...</div>
      ) : error ? (
        <div className="notif-box-error">{error}</div>
      ) : notifications && notifications.length > 0 ? (
        notifications.map((notif) => <NotifCard key={notif.id} notif={notif} />)
      ) : (
        <div className="notif-box-empty">اعلان جدیدی وجود ندارد.</div>
      )}
    </div>
  </div>
);

export default NotifBox; 