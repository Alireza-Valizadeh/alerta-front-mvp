import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AlarmPage from './pages/AlarmPage';
import './styles/reset.css';
import './styles/globals.css';
import './assets/vazir-font.css'
import PrivateRoute from './Components/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import ViewAlarmsPage from './pages/ViewAlarmsPage';
import SettingsPage from './pages/SettingsPage';
import CreditsPage from './pages/CreditsPage';
import LoadingPage from './pages/LoadingPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import NotificationsPage from './pages/NotificationsPage';

const App = () => {
  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          style: { direction: "rtl", fontFamily: "Vazir" },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/app/*" element={
          <Routes>
            <Route path="" element={<LoadingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="otp" element={<LoginPage />} />
            <Route path="alarms" element={<PrivateRoute><ViewAlarmsPage /></PrivateRoute>} />
            <Route path="alarms/edit" element={<PrivateRoute><AlarmPage /></PrivateRoute>} />
            <Route path="profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
            <Route path="credits" element={<PrivateRoute><CreditsPage /></PrivateRoute>} />
            <Route path="notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
          </Routes>
        } />
      </Routes>
    </Router>
  );
};

export default App;
