// src/pages/ViewAlarmsPage.js
import React, { useState, useEffect, useCallback } from "react";
import "../styles/ViewAlarmsPage.css";
import { useNavigate } from "react-router-dom";
import AlarmCard from "../Components/AlarmCard";
import { deleteAlarm, getUserAlarms } from "../services/api";
import toast from "react-hot-toast";
import AppBar from "../Components/AppBar";
import BottomNav from "../Components/BottomNav";

const ViewAlarmsPage = () => {
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ alarms });
  }, [alarms]);

  const fetchAlarms = useCallback(() => {
    setLoading(true); // Set loading true when re-fetching
    getUserAlarms()
      .then((data) => {
        setAlarms(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch alarms:", error);
        toast.error("خطا در دریافت لیست هشدارها");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setAlarms([]);
    fetchAlarms();
  }, []);

  const onDeleteAlarm = (alarmId) => {
    if (window.confirm(`آیا از حذف این هشدار مطمئن هستید؟`)) {
      deleteAlarm(alarmId)
        .then((response) => {
          console.log("Alarm deleted:", response);
          toast.success(`هشدار با موفقیت حذف شد.`);
          fetchAlarms();
        })
        .catch((error) => {
          console.error("Error deleting alarm:", error);
          toast.error(error?.response?.data?.message || "خطا در حذف هشدار!");
        });
    }
  };

  const handleCreateNewAlarm = () => {
    navigate("/app/alarms/edit");
  };

  return (
    <div className="page-wrapper">
      <AppBar />
      <main className="page-content view-alarms-page-content">
        {/* <div className="view-alarms-header">
          <h1>هشدارهای من</h1>
          <button onClick={handleCreateNewAlarm} className="create-alarm-button">
            <FiPlusCircle /> ثبت هشدار جدید
          </button>
        </div> */}

        {loading ? (
          <p style={{ textAlign: "center", fontSize: "1.2rem", marginTop: "2rem" }}>در حال بارگذاری لیست هشدارها...</p>
        ) : alarms.length > 0 ? (
          <div className="alarms-list">
            {alarms.map((alarm) => (
              <AlarmCard key={alarm.id} alarm={alarm} onDeleteAlarm={onDeleteAlarm} />
            ))}
          </div>
        ) : (
          <div className="no-alarms-message">
            <p>شما هنوز هیچ هشداری ثبت نکرده‌اید.</p>
            <button onClick={handleCreateNewAlarm} className="create-alarm-button-secondary">
              اولین هشدار خود را بسازید
            </button>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default ViewAlarmsPage;
