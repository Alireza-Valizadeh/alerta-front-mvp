import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUser, FaPhone, FaEnvelope, FaVenusMars, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { updateUserProfile } from "../services/api";
import SelectBox from "./SelectBox";

const Profile = ({ user }) => {
  const [isChanged, setIsChanged] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    gender: user.gender || "Not Specified",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        gender: user.gender || "Not Specified",
      });
    }
  }, [user]);

  if (!user || Object.keys(user).length === 0) return <p>در حال بارگذاری...</p>;

  const handleChange = (e) => {
    setIsChanged(true);
    const { name, value } = e.target;
    console.log({ name, value });
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(user.id, formData);
      toast.success("پروفایل با موفقیت به‌روزرسانی شد");
    } catch (error) {
      toast.error("خطا در ذخیره اطلاعات کاربر");
    }
  };

  const genderLabel = [
    { value: "Male", label: "مرد" },
    { value: "Female", label: "زن" },
    { value: "Other", label: "سایر" },
    { value: "Not Specified", label: "نامشخص" },
  ];

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <FaUser size={48} className="profile-icon" />
          <div>
            <h2 className="profile-name">
              {formData.firstName || "-"} {formData.lastName || ""}
            </h2>
            <p className={`profile-status ${user.isAbandoned ? "inactive" : "active"}`}>
              {user.isAbandoned ? (
                <>
                  <FaExclamationTriangle />
                  غیر فعال
                </>
              ) : (
                <>
                  <FaCheckCircle /> فعال
                </>
              )}
            </p>
          </div>
        </div>

        <div className="profile-info">
          <div className="profile-row">
            <div className="profile-label">
              <FaPhone /> تلفن:
            </div>
            <div className="profile-value">{user.phone}</div>
          </div>

          <div className="profile-row">
            <div className="profile-label">
              <FaEnvelope /> ایمیل:
            </div>
            <div className="profile-value">
              <input name="email" value={formData.email} onChange={handleChange} type="email" />
            </div>
          </div>

          <div className="profile-row">
            <div className="profile-label">
              <FaVenusMars /> جنسیت:
            </div>
            <div className="profile-value">
              <SelectBox
                options={genderLabel}
                value={genderLabel.find((g) => g.value === formData.gender)} // ✅ convert to full object
                onChange={(selected) =>
                  setFormData((prev) => ({
                    ...prev,
                    gender: selected ? selected.value : "Not Specified",
                  }))
                }
                placeholder="انتخاب جنسیت"
                name="gender"
              />
            </div>
          </div>

          <div className="profile-row">
            <div className="profile-label">نام:</div>
            <div className="profile-value">
              <input name={"firstName"} value={formData.firstName} onChange={handleChange} />
            </div>
          </div>

          <div className="profile-row">
            <div className="profile-label">نام خانوادگی:</div>
            <div className="profile-value">
              <input name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>

          <div className="profile-actions">
            <button className="submit-button" disabled={!isChanged} onClick={handleSave}>
              ذخیره تغییرات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
