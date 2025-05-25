import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { FaEdit, FaSave, FaSignOutAlt } from "react-icons/fa";
import { updateUserProfile } from "../services/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import '../styles/profile.css';

const Profile = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    email: user?.email || "",
  });
  const navigate = useNavigate();

  if (!user) return <p>در حال بارگذاری...</p>;

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setFormData({ firstName: user?.firstName || "", email: user?.email || "" });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = async () => {
    try {
      await updateUserProfile(user.id, { firstName: formData.firstName, email: formData.email });
      toast.success("پروفایل با موفقیت به‌روزرسانی شد");
      setEditMode(false);
    } catch {
      toast.error("خطا در ذخیره اطلاعات کاربر");
    }
  };
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/app/login", { replace: true });
  };

  return (
    <div className={`profile-minimal-card${editMode ? ' profile-edit-mode' : ''}`}>
      <div className="profile-minimal-avatar" style={{ marginBottom: editMode ? '0.7rem' : '0.3rem', width: editMode ? 48 : 40, height: editMode ? 48 : 40 }}>
        <FiUser size={editMode ? 36 : 28} color="#888" />
      </div>
      {!editMode && (
        <div className="profile-name-view" style={{ fontSize: '1.05rem', fontWeight: 600, color: '#222', marginBottom: 0, textAlign: 'center' }}>
          {user.firstName || "-"}
          <br /> <br />
          {user.phone || "-"}
        </div>
      )}
      {editMode && (
        <>
          <div className="profile-field-group compact">
            <label className="profile-label-minimal compact">نام</label>
            <input
              className="profile-input-minimal compact"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              autoFocus
            />
          </div>
          <div className="profile-field-group compact">
            <label className="profile-label-minimal compact">شماره موبایل</label>
            <input
              className="profile-input-minimal compact"
              value={user.phone || "-"}
              disabled
            />
          </div>
          <div className="profile-field-group compact">
            <label className="profile-label-minimal compact">ایمیل</label>
            <input
              className="profile-input-minimal compact"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      <div className="profile-btn-row compact">
        {editMode ? (
          <>
            <button className="profile-btn-minimal profile-btn-outline compact" onClick={handleSave}><FaSave style={{ marginLeft: 6 }} />ذخیره</button>
            <button className="profile-btn-minimal profile-btn-outline compact" onClick={handleCancel}>انصراف</button>
          </>
        ) : (
          <button className="profile-btn-minimal profile-btn-outline compact" onClick={handleEdit}><FaEdit style={{ marginLeft: 6 }} />ویرایش</button>
        )}
        <button className="profile-btn-minimal profile-btn-text-red compact" onClick={handleLogout}><FaSignOutAlt style={{ marginLeft: 6 }} />خروج</button>
      </div>
    </div>
  );
};

export default Profile;
