import React, { useState } from "react";
import PhoneInput from "../Components/PhoneInput";
import OTPInput from "../Components/OTPInput";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const LoginPage = () => {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");

  const handlePhoneSubmit = () => {
    if (!phone || phone.length < 10) {
      alert("لطفاً شماره معتبر وارد کنید");
      return;
    }
    setStep("otp");
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
