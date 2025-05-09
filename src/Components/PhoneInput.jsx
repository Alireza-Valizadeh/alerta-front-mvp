import React from "react";

const PhoneInput = ({ phone, setPhone, onSubmit }) => {
  return (
    <div style={{ textAlign: "right" }}>
      <label style={{ display: "block", marginBottom: "0.5rem" }}>شماره موبایل</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="مثلاً 09123456789"
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
        onClick={onSubmit}
        style={{
          padding: "0.6rem 1.2rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ارسال کد تایید
      </button>
    </div>
  );
};

export default PhoneInput;
