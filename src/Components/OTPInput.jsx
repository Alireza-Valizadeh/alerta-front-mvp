import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OTPInput = ({ phone }) => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    // In a real app, you'd verify the code here
    if (code.length === 4) {
      navigate("/alarms");
    } else {
      alert("کد تایید باید ۴ رقمی باشد");
    }
  };

  return (
    <div style={{ textAlign: "right" }}>
      <p style={{ marginBottom: "1rem" }}>
        کد تایید به شماره <strong>{phone}</strong> ارسال شد.
      </p>
      <label style={{ display: "block", marginBottom: "0.5rem" }}>کد تایید</label>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="مثلاً 1234"
        maxLength="4"
        style={{
          width: "100%",
          maxWidth: "300px",
          padding: "0.6rem",
          fontSize: "1rem",
          border: "1px solid #ccc",
          borderRadius: "6px",
          direction: "rtl",
          marginBottom: "1rem",
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: "0.6rem 1.2rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ورود
      </button>
    </div>
  );
};

export default OTPInput;
