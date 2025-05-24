import React, { useState } from "react";
import { verifyOTP } from "../services/api";
import toast from "react-hot-toast";

const OTPInput = ({ phone }) => {
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    verifyOTP(phone, code)
      .then(() => {
        toast.success("با موفقیت وارد شدید!");
        // navigation handled in parent
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        toast.error(message || "مشکلی پیش آمده است!");
      });
  };

  return (
    <>
      {/* <img src={process.env.PUBLIC_URL + "/alerta.jpg"} alt="Alerta Logo" className="login-modern-logo" /> */}
      {/* <h1 className="login-modern-title">ورود به آلرتا</h1> */}
      <div className="login-modern-form">
        <label className="login-modern-label" htmlFor="otp-code">
          کد تایید ارسال شده به {phone} را وارد کنید:
        </label>
        <div className="login-modern-input-wrapper">
          <input
            id="otp-code"
            type="number"
            className="login-modern-input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="مثلاً 1234"
            max="9999"
            min="1111"
            dir="ltr"
          />
        </div>
        <button className="login-modern-btn" onClick={handleSubmit}>
          ورود
        </button>
      </div>
    </>
  );
};

export default OTPInput;
