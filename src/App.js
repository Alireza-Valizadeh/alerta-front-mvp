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
        <Route path="/app/login" element={<LoginPage />} />
        <Route path="/app/otp" element={<LoginPage />} />
        <Route path="/app/*" element={
          <PrivateRoute>
            <Routes>
              <Route path="alarms" element={<ViewAlarmsPage />} />
              <Route path="alarms/edit" element={<AlarmPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="credits" element={<CreditsPage />} />
            </Routes>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
