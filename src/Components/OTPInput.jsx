import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOTP } from "../services/api";

const OTPInput = ({ phone }) => {
  const [code, setCode] = useState();
  const navigate = useNavigate();

  const handleSubmit = () => {
    verifyOTP(phone, code)
      .then((response) => {
        console.log(response);
        navigate("/alarms");
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        console.log({ message });
        alert(message || "Error!");
      });
  };

  return (
    <div className="form-box">
      <p className="otp-text">
        کد تایید به شماره <strong>{phone}</strong> ارسال شد.
      </p>
      {/* <label>کد تایید</label> */}
      <input
        type="number"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="مثلاً 1234"
        max="9999"
        min="1111"
      />
      <button onClick={handleSubmit}>ورود</button>
    </div>
  );
};

export default OTPInput;
