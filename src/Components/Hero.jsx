import React from "react";
import "../styles/hero.css"
// import HeroImage from '../assets/your-hero-image.jpg'; // Replace with your actual hero image

const Hero = () => {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(../assets/carSketch.png)` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>هوشمندترین راه برای پیدا کردن خودروی ایده‌آل شما</h1>
        <p>
          دیگر نیازی به جستجو در چندین سایت نیست. ما بهترین خودروهای مطابق با نیاز شما را از سراسر وب پیدا کرده و به شما
          اطلاع می‌دهیم.
        </p>
        <div className="hero-cta-container">
          <input
            type="text"
            placeholder="مثلا: پراید، پژو ۲۰۶ تا ۵۰۰ میلیون..."
            className="hero-search-input"
          />
          <button className="hero-button">جستجوی خودرو</button>
        </div>
        <p className="hero-sub-cta">
          یا <a href="#how-it-works">ببینید چطور کار می‌کنیم</a>
        </p>
      </div>
    </section>
  );
};

export default Hero;
