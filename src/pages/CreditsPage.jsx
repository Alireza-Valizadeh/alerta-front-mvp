import React from "react";
import AppBar from "../Components/AppBar";
import BottomNav from "../Components/BottomNav";

const CreditsPage = () => (
  <div className="page-wrapper">
    <AppBar />
    <main className="page-content">
      <h1>اعتبارها</h1>
      <p>در این صفحه می‌توانید اعتبارهای خود را مشاهده و مدیریت کنید.</p>
    </main>
    <BottomNav />
  </div>
);

export default CreditsPage; 