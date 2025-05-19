import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Profile from "../Components/Profile";
import { getUsersProfile } from "../services/api";
import Header from "../Components/Header";
import Footer from "../Components/Footer"; 
import Navbar from "../Components/Navbar";
import FooterV2 from "../Components/FooterV2";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getUsersProfile("/users/me")
      .then((userData) => {
        if (isMounted) {
          setUser(userData);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          // Check isMounted here too
          console.error(err);
          toast.error("خطا در دریافت اطلاعات کاربر");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <main className="page-content" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ textAlign: "center" }}>در حال بارگذاری...</p>
        </main>
        <FooterV2 /> 
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="page-content">
        {" "}
        {/* Changed div to main for semantics */}
        {/* The h1 for "پروفایل کاربری" can be uncommented if desired */}
        {/* <h1 style={{ textAlign: "center" }}>پروفایل کاربری</h1> */}
        <Profile user={user} />
      </main>
      <FooterV2 />
    </div>
  );
};

export default ProfilePage;
