import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.79:3000/v1", // Update this to your actual backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to send phone number for OTP
export const sendOTP = async (phone) => {
  const response = await api.post("/auth/login", { phone });
  return response.data;

};

// Function to verify OTP
export const verifyOTP = async (phone, code) => {
  const response = await api.post("/auth/login/validate", { phone, code });
  api.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
  return response.data;
};

// Function to create an alarm
export const createAlarm = async (alarmData) => {
  try {
    const response = await api.post("/alarms", alarmData);
    return response.data;
  } catch (error) {
    console.error("Error creating alarm:", error);
    throw new Error("Failed to create alarm");
  }
};
