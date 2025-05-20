// src/pages/ViewAlarmsPage.js
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar"; // Assuming Navbar is in components
import Footer from "../Components/Footer"; // Assuming Footer is in components
// import { getMyAlarms } from "../services/api"; // You'll need an API function to fetch alarms
import "../styles/ViewAlarmsPage.css"; // We'll create this CSS file
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AlarmCard from "../Components/AlarmCard";

// Mock data for alarms - replace with API call
const mockAlarms = [
  {
    id: "1",
    name: "پژو پارس سفید مدل ۹۵",
    make: { value: "1", label: "پژو" },
    model: { value: "12", label: "پارس سال" },
    minPrice: { value: 200000000, label: "۲۰۰ میلیون تومان" },
    maxPrice: { value: 300000000, label: "۳۰۰ میلیون تومان" },
    minYear: { value: 1395, label: "۱۳۹۵" },
    maxYear: { value: 1397, label: "۱۳۹۷" },
    state: { value: "1", label: "تهران" },
    city: { value: "5", label: "تهران" },
    colors: [
      { value: "1", label: "سفید" },
      { value: "2", label: "نقره‌ای" },
    ],
    minMileage: { value: 50000, label: "۵۰,۰۰۰ کیلومتر" },
    maxMileage: { value: 150000, label: "۱۵۰,۰۰۰ کیلومتر" },
    fuelTypeIds: [{ value: "1", label: "بنزینی" }],
    chassisStateIds: [{ value: "1", label: "سالم و بدون ضربه" }],
    engineStateIds: [{ value: "1", label: "سالم" }],
    bodyStateIds: [{ value: "1", label: "بدون رنگ" }],
    gearboxIds: [{ value: "1", label: "دنده‌ای" }],
    minInsuranceDuration: { value: 3, label: "۳ ماه" },
    maxInsuranceDuration: { value: 12, label: "۱۲ ماه" },
  },
  {
    id: "2",
    name: "تیبا صندوق دار ۹۹ به بالا",
    make: { value: "2", label: "سایپا" },
    model: { value: "20", label: "تیبا صندوق دار" },
    minPrice: { value: 100000000, label: "۱۰۰ میلیون تومان" },
    maxPrice: { value: 180000000, label: "۱۸۰ میلیون تومان" },
    minYear: { value: 1399, label: "۱۳۹۹" },
    maxYear: { value: 1403, label: "۱۴۰۳" },
    state: { value: "2", label: "اصفهان" },
    city: { value: "8", label: "اصفهان" },
    colors: [{ value: "3", label: "مشکی" }],
    // ... add other fields as needed for prefilling
  },
  // Add more mock alarms if needed
];

const ViewAlarmsPage = () => {
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching alarms
    // Replace this with actual API call:
    // getMyAlarms()
    //   .then(data => {
    //     setAlarms(data);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     console.error("Failed to fetch alarms:", error);
    //     toast.error("خطا در دریافت لیست هشدارها");
    //     setLoading(false);
    //   });
    setTimeout(() => {
      // Simulating network delay
      setAlarms(mockAlarms);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateNewAlarm = () => {
    navigate("/create-alarm"); // Navigate to the alarm creation page
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="page-content view-alarms-page-content">
        <div className="view-alarms-header">
          <h1>هشدارهای من</h1>
          <button onClick={handleCreateNewAlarm} className="create-alarm-button">
            <FiPlusCircle /> ثبت هشدار جدید
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", fontSize: "1.2rem", marginTop: "2rem" }}>در حال بارگذاری لیست هشدارها...</p>
        ) : alarms.length > 0 ? (
          <div className="alarms-list">
            {alarms.map((alarm) => (
              <AlarmCard key={alarm.id} alarm={alarm} />
            ))}
          </div>
        ) : (
          <div className="no-alarms-message">
            <p>شما هنوز هیچ هشداری ثبت نکرده‌اید.</p>
            <button onClick={handleCreateNewAlarm} className="create-alarm-button-secondary">
              اولین هشدار خود را بسازید
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ViewAlarmsPage;
