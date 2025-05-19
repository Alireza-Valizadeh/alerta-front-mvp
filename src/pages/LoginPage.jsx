import React, { useState } from "react";

import { sendOTP } from "../services/api";
import toast from "react-hot-toast";
import Navbar from "../Components/Navbar";
import FooterV2 from "../Components/FooterV2";
import PhoneInput from "../Components/PhoneInput";
import OTPInput from "../Components/OTPInput";

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
        console.log(response);
        toast.success("کد تایید به شماره شما ارسال شد!");
        setStep("otp");
      })
      .catch((e) => {
        console.error("Error sending OTP:", e); // It's good practice to log errors to console.error
        // Potentially show a user-facing error toast here too
        toast.error("خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.");
      });
  };

  return (
    // login-background-wrapper is likely for specific background styling of the login page
    <div className="login-background-wrapper">
      <div className="page-wrapper">
        <Navbar />
        <main className="page-content login-container">
          {step === "phone" ? (
            <PhoneInput phone={phone} setPhone={setPhone} onSubmit={handlePhoneSubmit} />
          ) : (
            <OTPInput phone={phone} />
          )}
        </main>
        <FooterV2 />
      </div>
    </div>
  );
};

export default LoginPage;
