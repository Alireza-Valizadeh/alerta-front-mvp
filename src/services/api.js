import axios from "axios";
import Cookies from "js-cookie";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://alerta.runflare.run/api/v1"// Production URL
    : "http://192.168.1.79:3000/api/v1" // Dev URL

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
    expires: 31,
    path: "/",
    sameSite: "Lax", // or "None" if needed across subdomains
    secure: window.location.protocol === "https", // only secure when over HTTPS
  });
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

export const getUsersProfile = async () => {
  const response = await api.get("/users/profile");
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

export const updateAlarm = async (alarmId, alarmData) => {
  try {
    const response = await api.put(`/preferences/${alarmId}`, alarmData); 
    return response.data;
  } catch (error) {
    console.error("Error updating alarm:", error);
    throw new Error("Failed to update alarm");
  }
};

export const deleteAlarm = async (alarmId) => {
  try {
    const response = await api.delete("/preferences/" + alarmId);
    return response.data;
  } catch (error) {
    console.error("Error updating alarm:", error);
    throw new Error("Failed to update alarm");
  }
};

export const getUserAlarms = async () => {
  try {
    const response = await api.get("/preferences");
    return response.data;
  } catch (error) {
    console.error("Error getting alarm:", error);
    throw new Error("Failed to get alarm");
  }
};

export const updateUserProfile = async (userId, data) => {
  const response = await api.put(`/users/${userId}`, data);
  return response.data;
};

export const getUserNotifications = async () => {
  // try {
  //   const response = await api.get("/notifications");
  //   return response.data;
  // } catch (error) {
  //   console.error("Error getting notifications:", error);
  //   throw new Error("Failed to get notifications");
  // }
  // MOCK DATA
  return [
    { id: 1, title: "خودروی جدید با معیارهای شما یافت شد!", date: "1403/03/10" },
    { id: 1, title: "خودروی جدید با معیارهای شما یافت شد!", date: "1403/03/10" },
    { id: 1, title: "خودروی جدید با معیارهای شما یافت شد!", date: "1403/03/10" },
    { id: 1, title: "خودروی جدید با معیارهای شما یافت شد!", date: "1403/03/10" },
    { id: 1, title: "خودروی جدید با معیارهای شما یافت شد!", date: "1403/03/10" },
    { id: 2, title: "آگهی مورد علاقه شما به‌روزرسانی شد.", date: "1403/03/09" },
    { id: 3, title: "یادآوری: اعتبار شما رو به پایان است.", date: "1403/03/08" }
  ];
};
