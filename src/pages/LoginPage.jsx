import React, { useState } from "react";
import PhoneInput from "../Components/PhoneInput";
import OTPInput from "../Components/OTPInput";

const LoginPage = () => {
  const [step, setStep] = useState("phone"); // 'phone' or 'otp'
  const [phone, setPhone] = useState("");

  const handlePhoneSubmit = () => {
    if (!phone || phone.length < 10) {
      alert("لطفاً شماره معتبر وارد کنید");
      return;
    }
    // TODO: Call backend to send OTP here
    setStep("otp");
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>ورود</h1>
      {step === "phone" ? (
        <PhoneInput phone={phone} setPhone={setPhone} onSubmit={handlePhoneSubmit} />
      ) : (
        <OTPInput phone={phone} />
      )}
    </div>
  );
};

const containerStyle = {
  padding: "2rem",
  direction: "rtl",
  textAlign: "right",
  backgroundColor: "#e6f0ff",
  minHeight: "100vh",
};

const headingStyle = {
  color: "#0a2540",
  marginBottom: "2rem",
};

export default LoginPage;
