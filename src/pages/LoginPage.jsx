import React, { useState } from "react";
import { sendOTP } from "../services/api";
import toast from "react-hot-toast";
import OTPInput from "../Components/OTPInput";
import "../styles/loginModern.css";

const LoginPage = () => {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");

  const handlePhoneSubmit = () => {
    if (!phone || phone.length < 11) {
      toast.error("شماره موبایل باید 11 رقم باشد!");
      return;
    }
    sendOTP(phone)
      .then((response) => {
        toast.success("کد تایید به شماره شما ارسال شد!");
        setStep("otp");
      })
      .catch(() => {
        toast.error("خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.");
      });
  };

  return (
    <div className="login-modern-bg">
      <div className="login-modern-card">
        <img src={process.env.PUBLIC_URL + "/alerta.jpg"} alt="Alerta Logo" className="login-modern-logo" />
        <h1 className="login-modern-title">ورود به آلرتا</h1>
        {step === "phone" ? (
          <div className="login-modern-form">
            <label className="login-modern-label" htmlFor="phone">
              شماره موبایل
            </label>
            <div className="login-modern-input-wrapper">
              {/* <FiPhone className="login-modern-input-icon" /> */}
              <input
                id="phone"
                type="tel"
                className="login-modern-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="مثلاً 09123456789"
                maxLength={11}
                dir="ltr"
              />
            </div>
            <button className="login-modern-btn" onClick={handlePhoneSubmit}>
              دریافت کد تایید
            </button>
          </div>
        ) : (
          <OTPInput phone={phone} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
