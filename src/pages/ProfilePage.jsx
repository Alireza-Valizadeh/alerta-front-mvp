import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Profile from "../Components/Profile";
import { getUsersProfile } from "../services/api";
import AppBar from "../Components/AppBar";
import BottomNav from "../Components/BottomNav";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = () => {
    setLoading(true);
    getUsersProfile("/users/me")
      .then((userData) => {
        setUser(userData);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("خطا در دریافت اطلاعات کاربر");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="page-wrapper">
        <AppBar />
        <main className="page-content" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ textAlign: "center" }}>در حال بارگذاری...</p>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <AppBar />
      <main className="page-content">
        {" "}
        {/* Changed div to main for semantics */}
        {/* The h1 for "پروفایل کاربری" can be uncommented if desired */}
        {/* <h1 style={{ textAlign: "center" }}>پروفایل کاربری</h1> */}
        <Profile user={user} onProfileUpdated={fetchProfile} />
      </main>
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
