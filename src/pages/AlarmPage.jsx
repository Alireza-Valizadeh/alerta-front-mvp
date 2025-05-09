import React from "react";
import AlarmForm from "../Components/AlarmForm";

const AlarmPage = () => {
  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>تنظیم هشدار خودرو</h1>
      <AlarmForm />
    </div>
  );
};

const pageStyle = {
  padding: "2rem",
  direction: "rtl",
  textAlign: "right",
  backgroundColor: "#e6f0ff",
  minHeight: "100vh",
};

const headingStyle = {
  color: "#0a2540",
  marginBottom: "2rem",
};

export default AlarmPage;
