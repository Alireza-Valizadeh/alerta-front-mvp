import React from "react";

const PhoneInput = ({ phone, setPhone, onSubmit }) => {
  return (
    <div className="form-box">
      <label>شماره موبایل</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="مثلاً 09123456789"
      />
      <button className="submit-button" onClick={onSubmit}>ارسال کد تایید</button>
    </div>
  );
};

export default PhoneInput;
