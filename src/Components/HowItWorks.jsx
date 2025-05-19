import React from "react";
import "../styles/howItWorks.css"; // For specific styles
// Import icons if you have them, e.g., from react-icons
// import { FaSearch, FaCog, FaBell } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      // icon: <FaSearch size={40} className="how-it-works-icon" />,
      iconPlaceholder: "۱", // Placeholder for icon
      title: "معیارهای خود را بگویید",
      description: "نوع خودرو، برند، مدل، بودجه و سایر مشخصات دلخواه خود را وارد کنید.",
    },
    {
      id: 2,
      // icon: <FaCog size={40} className="how-it-works-icon" />,
      iconPlaceholder: "۲",
      title: "ما همه جا را می‌گردیم",
      description: "سیستم هوشمند ما در لحظه تمام وب‌سایت‌های معتبر آگهی خودرو را جستجو می‌کند.",
    },
    {
      id: 3,
      // icon: <FaBell size={40} className="how-it-works-icon" />,
      iconPlaceholder: "۳",
      title: "بهترین‌ها را به شما اطلاع می‌دهیم",
      description:
        "خودروهای مطابق با معیارهای شما را نمایش داده و در صورت تمایل، آگهی‌های جدید را به شما هشدار می‌دهیم.",
    },
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container-custom">
        <h2>چطور کار می‌کند؟</h2>
        <div className="how-it-works-grid">
          {steps.map((step) => (
            <div key={step.id} className="how-it-works-step">
              <div className="step-icon-container">
                {/* {step.icon || <span className="step-number">{step.iconPlaceholder}</span>} */}
                <span className="step-number">{step.iconPlaceholder}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
