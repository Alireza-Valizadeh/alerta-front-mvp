import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OTPInput = ({ phone }) => {
  const [code, setCode] = useState();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (code.length === 4) {
      navigate("/alarms");
    } else {
      alert("کد تایید باید ۴ رقمی باشد");
    }
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
