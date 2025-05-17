import React from "react";
import AlarmForm from "../Components/AlarmForm";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const AlarmPage = () => {
  return (
    <div style={wrapperStyle}>
      <Header />
      <main style={mainStyle}>
        <h1 style={headingStyle}>تنظیم هشدار خودرو</h1>
        <AlarmForm />
      </main>
      <Footer />
    </div>
  );
};

const wrapperStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  direction: "rtl",
  backgroundColor: "#e6f0ff",
};

const mainStyle = {
  flex: 1,
  padding: "2rem",
  textAlign: "right",
};

const headingStyle = {
  color: "#0a2540",
  marginBottom: "2rem",
};

export default AlarmPage;
