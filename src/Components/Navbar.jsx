import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // If using React Router
import "../styles/navbar.css";
import MobileMenu from "./MobileMenu"; // Import the new component
import { FiMenu } from "react-icons/fi"; // Hamburger icon

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobileView(mobile);
      if (!mobile && isMobileMenuOpen) {
        // Close mobile menu if screen resizes to desktop
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Close mobile menu if overlay is controlled by MobileMenu's state
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup function to restore scroll if component unmounts while menu is open
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="navbar-header">
        <div className="navbar-container">
          {isMobileView ? (
            <>
              {/* Middle Element: Hamburger Button */}
              <div className="hamburger-container-mobile-center">
                <button onClick={toggleMobileMenu} className="hamburger-button" aria-label="Open menu">
                  <FiMenu size={28} />
                </button>
              </div>

              <div className="navbar-brand navbar-brand-mobile-left">
                <Link to="/">آلرتا</Link> {/* Assuming آلرتا is your brand name */}
              </div>

              {/* Right Element: Empty div for spacing, or an icon if needed */}

              <div className="navbar-mobile-right-spacer">
                <button>
                  <Link to="/login">ورود</Link>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="navbar-brand">
                <Link to="/">آلرتا</Link> {/* Assuming آلرتا is your brand name */}
              </div>
              <nav className="navbar-nav">
                <ul>
                  <li>
                    <a href="/#features">ویژگی‌ها</a>
                  </li>
                  <li>
                    <a href="/#how-it-works">چطور کار می‌کند؟</a>
                  </li>
                  {/* Add other desktop nav items or login/register if not in mobile menu */}
                  <li>
                    <Link to="/login">ورود</Link>
                  </li>
                  <li>
                    <Link to="/login" className="navbar-cta">
                      ثبت نام
                    </Link>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </header>
      {isMobileView && <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />}
    </>
  );
};

export default Navbar;
