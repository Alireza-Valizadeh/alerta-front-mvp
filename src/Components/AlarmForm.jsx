import React, { useState } from "react";

const AlarmForm = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // You would send this to your backend here
    const alarmData = { brand, model, maxPrice };
    console.log("Alarm set:", alarmData);
    alert("هشدار با موفقیت ثبت شد!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "right", maxWidth: "400px" }}>
      <label>برند خودرو</label>
      <input
        type="text"
        placeholder="مثلاً پراید"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        style={inputStyle}
      />

      <label>مدل</label>
      <input
        type="text"
        placeholder="مثلاً ۱۳۹۸"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        style={inputStyle}
      />

      <label>حداکثر قیمت (تومان)</label>
      <input
        type="number"
        placeholder="مثلاً ۲۰۰۰۰۰۰۰۰"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        style={inputStyle}
      />

      <button type="submit" style={buttonStyle}>
        ثبت هشدار
      </button>
    </form>
  );
};

const inputStyle = {
  width: "100%",
  padding: "0.6rem",
  marginBottom: "1rem",
  border: "1px solid #ccc",
  borderRadius: "6px",
  direction: "rtl",
};

const buttonStyle = {
  padding: "0.6rem 1.2rem",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default AlarmForm;
