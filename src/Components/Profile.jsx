import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, } from "react-icons/fa";
import { updateUserProfile, getUserNotifications } from "../services/api";
import toast from "react-hot-toast";
import '../styles/profile.css';
import logo from '../assets/alerta.jpg';
import { MdPerson } from "react-icons/md";
import NotifBox from "./NotifBox";
import { formatRelativeTime } from "../utils/formatters";

const Profile = ({ user, onProfileUpdated }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    email: user?.email || "",
  });
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(true);
  const [notifError, setNotifError] = useState(null);

  useEffect(() => {
    setNotifLoading(true);
    getUserNotifications()
      .then((data) => {
        setNotifications(data);
        setNotifLoading(false);
      })
      .catch((err) => {
        setNotifError("خطا در دریافت اعلان‌ها");
        setNotifLoading(false);
      });
  }, []);

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
      if (onProfileUpdated) onProfileUpdated();
    } catch {
      toast.error("خطا در ذخیره اطلاعات کاربر");
    }
  };

  return (
    <div className={`profile-minimal-card${editMode ? ' profile-edit-mode' : ''}`} style={{ position: 'relative' }}>
      <div className="profile-minimal-avatar" style={{ marginBottom: editMode ? '0.7rem' : '0.3rem', width:  55, height: 55 , overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '100%' }} />
      </div>

      <div className="profile-summary-row">
        <div className="profile-summary-col">
          <div className="profile-summary-label">اعتبار</div>
          <div className="profile-summary-value profile-balance-amount" style={{ color: user.balance < 0 ? '#e53935' : '#1976d2' }}>{user.balance !== null && user.balance !== undefined ? user.balance.toLocaleString('fa-IR') : '-'} پیامک</div>
        </div>
        <div className="profile-summary-col">
          <div className="profile-summary-label">آخرین اعلان دریافتی</div>
          <div className="profile-summary-value profile-last-notif-date">{user.lastCreditUpdate ? formatRelativeTime(user.lastCreditUpdate) : '-'}</div>
        </div>
      </div>
      {!editMode && (
        <div className="profile-name-view" style={{ fontSize: '1.05rem', fontWeight: 600, color: '#222', marginBottom: 0, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <button
            className="btn"
            onClick={handleEdit}
          >
            <span style={{ fontWeight: 700, fontSize: '1.08rem' }}>{user.firstName || "-"} ({user.phone || "-"})</span>
            {/* {user.email && <><br /> <br/> <span style={{ fontFamily: 'Tahoma, Arial, Roboto, sans-serif', fontWeight: 400, fontSize: '1.01rem', color: '#555' }}>{user.email || "-"}</span></> } */}
          </button>
          {/* <button
            onClick={handleEdit}
            className="action-icon-button edit-button"
            title="ویرایش پروفایل"
          >
            <FaEdit size={14} color="#1976d2" style={{ zIndex: 1000 }} />
          </button> */}

        </div>
      )}
      {editMode && (
        <>
          <div className="profile-field-group compact" style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'stretch', marginBottom: 10 }}>
            <label className="profile-label-minimal compact" >
              <FaEdit size={14} color="#1976d2" style={{ marginLeft: 3 }} />
              نام
            </label>
            <input
              className="profile-input-minimal compact"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              autoFocus
              style={{ flex: 1 }}
            />
          </div>
          <div className="profile-field-group compact" style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'stretch', marginBottom: 10 }}>
            <label className="profile-label-minimal compact" >
              <MdPerson size={14} color="#1976d2" style={{ marginLeft: 3 }} />
              شماره موبایل
            </label>
            <input
              className="profile-input-minimal compact"
              value={user.phone || "-"}
              disabled
              style={{ flex: 1, background: "#f5f5f5" }}
            />
          </div>
          <div className="profile-field-group compact" style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'stretch', marginBottom: 10 }}>
            <label className="profile-label-minimal compact" >
              <FaSave size={14} color="#1976d2" style={{ marginLeft: 3 }} />
              ایمیل
            </label>
            <input
              className="profile-input-minimal compact"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ flex: 1 }}
            />
          </div>
          <div style={{ width: "100%", display: "flex", gap: 8, marginTop: 18 }}>
            <button
              className="btn"
              style={{
                flex: 1,
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                padding: "0.7rem 0",
                fontSize: "1rem",
                cursor: "pointer"
              }}
              onClick={handleSave}
            >
              ذخیره تغییرات
            </button>
            <button
              className="btn"
              style={{
                flex: 1,
                background: "#ffeaea",
                color: "var(--color-error)",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                padding: "0.7rem 0",
                fontSize: "1rem",
                cursor: "pointer"
              }}
              onClick={handleCancel}
              type="button"
            >
              انصراف
            </button>
          </div>
        </>
      )}
      {/* Notifications Section */}
      {!editMode && (
        <NotifBox notifications={notifications} loading={notifLoading} error={notifError} />
      )}
    </div>
  );
};

export default Profile;
