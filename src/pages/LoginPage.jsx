import React, { useState } from "react";
import PhoneInput from "../Components/PhoneInput";
import OTPInput from "../Components/OTPInput";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { sendOTP } from "../services/api";
import toast from "react-hot-toast";

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
      .catch((e) => console.log(e));
  };

  return (
    <div className="login-background-wrapper">
      <div className="page-wrapper">
        <div className="page-content login-container">
          <Header />
          {step === "phone" ? (
            <PhoneInput phone={phone} setPhone={setPhone} onSubmit={handlePhoneSubmit} />
          ) : (
            <OTPInput phone={phone} />
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
