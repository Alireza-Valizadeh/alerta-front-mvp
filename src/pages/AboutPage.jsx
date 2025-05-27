import React from "react";
import Navbar from "../Components/Navbar";
import FooterV2 from "../Components/FooterV2";

const AboutPage = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="page-content" style={{ maxWidth: 700, margin: "2rem auto", padding: "2rem 1rem" }}>
        <h1 style={{ textAlign: "center", color: "#0a2540", marginBottom: "1.5rem" }}>درباره آلرتا</h1>
        <p style={{ fontSize: "1.1rem", lineHeight: 2, color: "#222", textAlign: "justify" }}>
          آلرتا یک پلتفرم هوشمند برای جستجو و مقایسه آگهی‌های خودرو از سراسر وب است. هدف ما ساده‌تر کردن فرآیند پیدا کردن خودروی مناسب برای شماست. با استفاده از آلرتا می‌توانید به سرعت آگهی‌های مختلف را مشاهده، مقایسه و هشدارهای شخصی‌سازی شده دریافت کنید.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: 2, color: "#222", textAlign: "justify", marginTop: "1.2rem" }}>
          تیم ما متعهد به ارائه بهترین تجربه کاربری و پشتیبانی از کاربران عزیز است. اگر سوال یا پیشنهادی دارید، خوشحال می‌شویم با ما در ارتباط باشید.
        </p>
      </main>
      <FooterV2 />
    </div>
  );
};

export default AboutPage; 