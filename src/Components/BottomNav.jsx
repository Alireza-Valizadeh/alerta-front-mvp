import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdNotifications, MdPerson, MdSettings, MdAdd } from "react-icons/md";
import { BsCreditCard2Back } from "react-icons/bs";

const navItems = [
  { label: "پروفایل", icon: <MdPerson size={22} />, path: "/app/profile" },
  { label: "هشدارها", icon: <MdNotifications size={22} />, path: "/app/alarms" },
  { label: "پیامک ها", icon: <BsCreditCard2Back size={22} />, path: "/app/credits" },
  { label: "تنظیمات", icon: <MdSettings size={22} />, path: "/app/settings" },
];
navItems.reverse();

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  return (
    <nav className="bottom-nav">
      <ul className="bottom-nav-list">
        {navItems.slice(0, 2).map((item) => (
          <li key={item.path} className={path === item.path ? "active" : ""}>
            <button className="bottom-nav-btn" onClick={() => navigate(item.path)}>
              {item.icon}
              <span>{item.label}</span>
            </button>
          </li>
        ))}
        <li className="bottom-nav-plus">
          <button
            className="bottom-nav-plus-btn"
            onClick={() => navigate("/app/alarms/edit")}
            aria-label="ایجاد هشدار جدید"
          >
            <MdAdd size={28} />
          </button>
        </li>
        {navItems.slice(2).map((item) => (
          <li key={item.path} className={path === item.path ? "active" : ""}>
            <button className="bottom-nav-btn" onClick={() => navigate(item.path)}>
              {item.icon}
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav; 