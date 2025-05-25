import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    // Simulate a short delay for UX (optional)
    setTimeout(() => {
      if (token) {
        navigate("/app/profile", { replace: true });
      } else {
        navigate("/app/login", { replace: true });
      }
    }, 800); // 800ms delay for loading effect
  }, [navigate]);

  return (
    <div className="page-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <main className="page-content" style={{ textAlign: "center" }}>
        <div className="car-animation-container" style={{ position: 'relative', width: '100%', height: '100px', overflow: 'hidden', margin: '2rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg
            className="car-icon"
            width="120"
            height="60"
            viewBox="0 0 120 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
          >
            <rect x="20" y="30" width="80" height="18" rx="6" fill="#1976d2" />
            <rect x="35" y="18" width="50" height="18" rx="6" fill="#90caf9" />
            <ellipse cx="38" cy="52" rx="10" ry="10" fill="#222" />
            <ellipse cx="82" cy="52" rx="10" ry="10" fill="#222" />
            <rect x="60" y="35" width="10" height="5" rx="2" fill="#fff" />
            <rect x="25" y="35" width="10" height="5" rx="2" fill="#fff" />
            <rect x="85" y="35" width="10" height="5" rx="2" fill="#fff" />
            <rect x="50" y="22" width="20" height="10" rx="3" fill="#fff" opacity="0.7" />
            <circle cx="30" cy="40" r="2" fill="#ffd600" />
            <circle cx="90" cy="40" r="2" fill="#ffd600" />
          </svg>
        </div>
        <style>{`
          .car-icon {
            animation: car-move 2.2s linear infinite;
          }
          @keyframes car-move {
            0% { left: 0; }
            100% { left: 60%; }
          }
        `}</style>
      </main>
    </div>
  );
};

export default LoadingPage; 