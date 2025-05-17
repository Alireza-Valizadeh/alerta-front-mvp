import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Profile from "../Components/Profile";
import { getUsersProfile } from "../services/api";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ loading flag

  useEffect(() => {
    let isMounted = true;

    getUsersProfile("/users/me")
      .then((user) => {
        if (isMounted) {
          setUser(user);
          //   toast.success("اطلاعات کاربر با موفقیت دریافت شد");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("خطا در دریافت اطلاعات کاربر");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>در حال بارگذاری...</p>;
  return (
    <div className="page-wrapper">
      <Header />
      <div className="page-content">
        {/* <h1 style={{ textAlign: "center" }}>پروفایل کاربری</h1> */}
        {loading ? <p style={{ textAlign: "center" }}>در حال بارگذاری...</p> : <Profile user={user} />}
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
