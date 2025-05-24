import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import AlarmForm from "../Components/AlarmForm";
import AppBar from "../Components/AppBar";
import BottomNav from "../Components/BottomNav";

const AlarmPage = () => {
  const location = useLocation(); // Get location object
  const alarmToEdit = location.state?.alarmToEdit; // Get alarm data from state

  return (
    <div className="page-wrapper">
      <AppBar />
      <main style={mainContentStyle} className="page-content">
        <h1 style={headingStyle}>{alarmToEdit ? "ویرایش هشدار" : "تنظیم هشدار خودرو"}</h1>
        <AlarmForm existingAlarmData={alarmToEdit} />
      </main>
      <BottomNav />
    </div>
  );
};

const mainContentStyle = {
  padding: "2rem",
  textAlign: "right",
  maxWidth: "600px", // Constrain width for form pages
  // margin: "0 auto", // Center form
};

const headingStyle = {
  color: "#0a2540",
  marginBottom: "2rem",
  textAlign: "center", // Center heading for form pages
};

export default AlarmPage;
