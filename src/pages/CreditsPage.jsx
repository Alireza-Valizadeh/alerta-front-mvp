import React from "react";
import AppBar from "../Components/AppBar";
import BottomNav from "../Components/BottomNav";

const CreditsPage = () => (
  <div className="page-wrapper">
    <AppBar />
    <main className="page-content">
      <h1>اعتبارها</h1>
      {/* <p>در این صفحه می‌توانید اعتبارهای خود را مشاهده و مدیریت کنید.</p> */}
      <p>در حال حاضر استفاده از پلتفرم به صورت رایگان است.</p>
      <div style={{ fontSize: "3rem", marginTop: "1rem", color: "#1976d2", textAlign: "center" }}>
        😊
      </div>
    </main>
    <BottomNav />
  </div>
);

export default CreditsPage; 