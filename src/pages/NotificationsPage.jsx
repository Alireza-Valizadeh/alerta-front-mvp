import React, { useEffect, useState } from "react";
import AppBar from "../Components/AppBar";
import BottomNav from "../Components/BottomNav";
import NotifBox from "../Components/NotifBox";
import { getUserNotifications } from "../services/api";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getUserNotifications()
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch(() => {
        setError("خطا در دریافت اعلان‌ها");
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-wrapper">
      <AppBar />
      <main className="page-content">
        <NotifBox notifications={notifications} loading={loading} error={error} />
      </main>
      <BottomNav />
    </div>
  );
};

export default NotificationsPage; 