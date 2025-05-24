import React from "react";
import AppBar from "../Components/AppBar";
import BottomNav from "../Components/BottomNav";

const SettingsPage = () => (
  <div className="page-wrapper">
    <AppBar />
    <main className="page-content">
      <h1>تنظیمات</h1>
      <p>در اینجا می‌توانید تنظیمات حساب کاربری خود را مدیریت کنید.</p>
    </main>
    <BottomNav />
  </div>
);

export default SettingsPage; 