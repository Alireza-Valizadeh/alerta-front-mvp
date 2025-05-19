import React from "react";
import Navbar from "../Components/Navbar";
import FooterV2 from "../Components/FooterV2";
import AlarmForm from "../Components/AlarmForm";

const AlarmPage = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main style={mainContentStyle} className="page-content">
        <h1 style={headingStyle}>تنظیم هشدار خودرو</h1>
        <AlarmForm />
      </main>
      <FooterV2 />
    </div>
  );
};
const mainContentStyle = {
  padding: "2rem",
  textAlign: "right",
};

const headingStyle = {
  color: "#0a2540",
  marginBottom: "2rem",
};

export default AlarmPage;
