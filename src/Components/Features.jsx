import React from "react";
import "../styles/features.css";
import { FaClock, FaSearchDollar, FaBell, FaCheckCircle } from "react-icons/fa"; // Example icons

const Features = () => {
  const featuresList = [
    {
      icon: <FaClock size={30} />,
      title: "صرفه‌جویی در زمان",
      description: "دسترسی به هزاران آگهی از منابع مختلف، همه در یک پلتفرم یکپارچه.",
    },
    {
      icon: <FaSearchDollar size={30} />,
      title: "مقایسه هوشمند و آسان",
      description: "به راحتی مشخصات و قیمت خودروها را از سایت‌های گوناگون مقایسه کنید.",
    },
    {
      icon: <FaBell size={30} />,
      title: "هشدارهای فوری و شخصی‌سازی شده",
      description: "به محض ثبت آگهی جدید مطابق با معیارهای شما، اولین نفر باخبر شوید.",
    },
    {
      icon: <FaCheckCircle size={30} />,
      title: "پوشش جامع و به‌روز",
      description: "ما دائماً در حال افزودن منابع جدید برای ارائه کامل‌ترین لیست خودروها هستیم.",
    },
  ];

  return (
    <section id="features" className="features-section">
      <div className="container-custom">
        <h2>چرا پلتفرم ما؟</h2>
        <div className="features-grid">
          {featuresList.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">
                {/* {feature.icon} */}
                {/* Placeholder for Icon, e.g., using a simple character or image */}
                <span>⭐</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
