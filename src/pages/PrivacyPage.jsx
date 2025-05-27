import React from "react";
import Navbar from "../Components/Navbar";
import FooterV2 from "../Components/FooterV2";

const PrivacyPage = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="page-content" style={{ maxWidth: 700, margin: "2rem auto", padding: "2rem 1rem" }}>
        <h1 style={{ textAlign: "center", color: "#0a2540", marginBottom: "1.5rem" }}>حریم خصوصی</h1>
        <p style={{ fontSize: "1.1rem", lineHeight: 2, color: "#222", textAlign: "justify" }}>
          ما در آلرتا به حریم خصوصی کاربران خود اهمیت ویژه‌ای می‌دهیم. اطلاعات شخصی شما فقط برای ارائه خدمات بهتر و بهبود تجربه کاربری استفاده می‌شود و هرگز بدون اجازه شما در اختیار شخص ثالث قرار نمی‌گیرد.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: 2, color: "#222", textAlign: "justify", marginTop: "1.2rem" }}>
          برای اطلاعات بیشتر درباره نحوه جمع‌آوری و استفاده از داده‌ها، لطفاً با ما تماس بگیرید یا بخش سوالات متداول را مطالعه کنید.
        </p>
      </main>
      <FooterV2 />
    </div>
  );
};

export default PrivacyPage; 