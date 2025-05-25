import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/mobileMenu.css";
import { MdClose, MdPerson, MdNotifications, MdCreditCard, MdLogout, MdHome, MdList, MdHelp } from "react-icons/md";
import Cookies from "js-cookie";
// import ProfilePlaceholder from '../assets/profile-placeholder.png'; // Optional: if you have a placeholder image

const MobileMenu = ({ isOpen, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate(); // For programmatic navigation like sign out

  useEffect(() => {
    let animationFrameId;

    if (isOpen) {
      // For opening:
      // Set isActive to true in the next animation frame
      // This ensures the browser has processed the initial (closed) state.
      animationFrameId = requestAnimationFrame(() => {
        setIsActive(true);
      });
    } else {
      // For closing:
      // Set isActive to false immediately.
      // The CSS transitions defined on the base classes should handle the animation.
      setIsActive(false);
    }

    // Cleanup function for the animation frame
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSignOut = () => {
    Cookies.remove("token");
    onClose(); // Close menu
    navigate("/"); // Redirect to home or login page
  };

  const handleLinkClick = () => {
    onClose(); // Close menu when a link is clicked
  };

  // Menu items - adjust routes and text as needed
  const menuItems = [
    { text: "صفحه اصلی", icon: <MdHome />, href: "/", type: "link" },
    { text: "پروفایل", icon: <MdPerson />, href: "/app/profile", type: "link" },
    { text: "هشدارهای من", icon: <MdNotifications />, href: "/app/alarms", type: "link" },
    { text: "اعتبار / تعرفه‌ها", icon: <MdCreditCard />, href: "/app/credits", type: "link" },
    { text: "ویژگی‌ها", icon: <MdList />, href: "/#features", type: "link", isHashLink: true },
    { text: "چطور کار می‌کند؟", icon: <MdHelp />, href: "/#how-it-works", type: "link", isHashLink: true },
  ];

  return (
    <>
      <div
        className={`mobile-menu-overlay ${isActive ? "open" : "close"}`} // Ensure .open class is applied
        onClick={onClose}
      ></div>
      <div className={`mobile-menu ${isActive ? "open" : ""}`}>
        <div className="mobile-menu-header">
          {/* Optional: Profile Info */}
          <div className="mobile-menu-profile">
            {/* <img src={ProfilePlaceholder} alt="پروفایل" className="mobile-menu-profile-img" /> */}
            <MdPerson size={40} className="mobile-menu-profile-icon-placeholder" />
            <span className="mobile-menu-profile-name">نام کاربر</span> {/* Replace with actual user name */}
          </div>
          <button onClick={onClose} className="mobile-menu-close-btn">
            <MdClose size={28} />
          </button>
        </div>
        <nav className="mobile-menu-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.href} onClick={handleLinkClick} className="mobile-menu-link">
                  {item.icon}
                  <span>{item.text}</span>
                </Link>
              </li>
            ))}
            <li>
              <button onClick={handleSignOut} className="mobile-menu-link mobile-menu-signout-btn">
                <MdLogout />
                <span>خروج از حساب</span>
              </button>
            </li>
          </ul>
        </nav>
        <div className="mobile-menu-footer">
          <p>خودرو یاب شما &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
