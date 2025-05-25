import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowRight, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";

const TITLES = {
  "/app/alarms": "هشدارها",
  "/app/alarms/edit": "ویرایش هشدار",
  "/app/profile": "پروفایل",
  "/app/settings": "تنظیمات",
  "/app/credits": "اعتبارها",
};

const AppBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  // Determine title
  let title = TITLES[path] || "آلرتا";

  // Show back button if not on main alarms page
  const showBack = path !== "/app/alarms";
  // Show settings icon except on settings page and only if no back button
  const showSettings = !showBack && path !== "/app/settings";
  // Show profile icon except on profile page and only if no back button
  const showProfile = !showBack && path !== "/app/profile";

  // Handlers
  const handleBack = () => navigate(-1);
  const handleSettings = () => navigate("/app/settings");
  const handleProfile = () => navigate("/app/profile");

  // Logout handler
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/app/login", { replace: true });
  };

  return (
    <header className="appbar-header">
      <div className="appbar-left">
        {/* Show logout only on profile page */}
        {path === "/app/profile" ? (
          <button className="appbar-icon-btn" onClick={handleLogout} aria-label="خروج" title="خروج">
            <FiLogOut size={24} color="#d32f2f" />
          </button>
        ) :
          (!showBack && showSettings && (
            <button className="appbar-icon-btn" onClick={handleSettings} aria-label="تنظیمات">
              <FiSettings size={24} />
            </button>
          ))
        }
      </div>
      <div className="appbar-title">{title}</div>
      <div className="appbar-right">
        {showBack ? (
          <button className="appbar-icon-btn" onClick={handleBack} aria-label="بازگشت">
            <FiArrowRight size={24} />
          </button>
        ) : (
          showProfile && (
            <button className="appbar-icon-btn" onClick={handleProfile} aria-label="پروفایل">
              <FiUser size={24} />
            </button>
          )
        )}
      </div>
    </header>
  );
};

export default AppBar; 