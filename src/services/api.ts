import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Update this to your actual backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to send phone number for OTP
export const sendOTP = async (phone: string) => {
  try {
    const response = await api.post("/auth/send-otp", { phone });
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

// Function to verify OTP
export const verifyOTP = async (phone: string, otp: string) => {
  try {
    const response = await api.post("/auth/verify-otp", { phone, otp });
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw new Error("Failed to verify OTP");
  }
};

// Function to create an alarm
export const createAlarm = async (alarmData: { brand: string; model: string; maxPrice: number }) => {
  try {
    const response = await api.post("/alarms", alarmData);
    return response.data;
  } catch (error) {
    console.error("Error creating alarm:", error);
    throw new Error("Failed to create alarm");
  }
};

export default api;
