import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://192.168.1.79:3000/api/v1", // Update this to your actual backend URL
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
  const token = response.data.access_token;
  Cookies.set("token", token, {
    expires: 7, // days
    secure: true,
    sameSite: "Strict", // adjust for cross-origin if needed
    path: "/",
  });
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return response.data;
};


export const getAlarmCreationData = async () => {
  const response = await api.get("/listings/creation-data");
  return response.data;
};

export const getStateCities = async (stateId) => {
  const response = await api.get("/cities/states/" + stateId);
  return response.data;
};

export const getMakeModels = async (makeId) => {
  const response = await api.get("/models/makes/" + makeId);
  return response.data;
};

// Function to create an alarm
export const createAlarm = async (alarmData) => {
  try {
    const response = await api.post("/preferences", alarmData);
    return response.data;
  } catch (error) {
    console.error("Error creating alarm:", error);
    throw new Error("Failed to create alarm");
  }
};
