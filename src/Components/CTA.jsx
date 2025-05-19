import React from "react";
import "../styles/cta.css";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="container-custom cta-content">
        <h2>آماده‌اید خودروی رویایی خود را پیدا کنید؟</h2>
        <p>به هزاران کاربر دیگر بپیوندید و جستجوی هوشمند خودرو را تجربه کنید. سریع، آسان و رایگان!</p>
        <button className="cta-button">
          <Link to={"/alarms"}>همین حالا شروع کنید !</Link>
        </button>
      </div>
    </section>
  );
};

export default CTA;
