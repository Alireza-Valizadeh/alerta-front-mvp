import React from "react";
import { FaUserCog, FaBell, FaLock, FaLanguage, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import SettingsCard from "../Components/SettingsCard";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AppBar from "../Components/AppBar";
import BottomNav from "../Components/BottomNav";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/app/login", { replace: true });
  };

  const settingsOptions = [
    {
      icon: FaUserCog,
      title: "پروفایل",
      description: "ویرایش اطلاعات کاربری",
      onClick: () => navigate("/app/profile"),
    },
    {
      icon: FaBell,
      title: "اعلان‌ها",
      description: "مدیریت تنظیمات اعلان",
      onClick: () => navigate("/app/notifications"),
    },
    {
      icon: FaLock,
      title: "حریم خصوصی",
      description: "تنظیمات امنیت و حریم خصوصی",
      onClick: () => navigate("/privacy"),
    },
    {
      icon: FaLanguage,
      title: "زبان",
      description: "تغییر زبان برنامه",
      onClick: () => toast.error("تنها زبان فارسی موجود است")
    },
    {
      icon: FaInfoCircle,
      title: "درباره ما",
      description: "اطلاعات بیشتر درباره آلرتا",
      onClick: () => navigate("/about"),
    },
    {
      icon: FaSignOutAlt,
      title: "خروج  حساب کاربری",
      // description: "ویرایش اطلاعات کاربری",
      onClick: () => handleLogout(),
    },
  ];

  return (
    <div className="page-wrapper">
      <AppBar />
      <main style={{ maxWidth: 500, margin: "2rem auto", padding: "1rem" }} className="page-content">
        {/* <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>تنظیمات</h1> */}
        {settingsOptions.map((option, idx) => (
          <SettingsCard key={idx} {...option} />
        ))}
      </main>
      <BottomNav />
    </div>
  );
};

export default SettingsPage;
