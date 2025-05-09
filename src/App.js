import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AlarmPage from './pages/AlarmPage';
import './styles/reset.css';
import './styles/globals.css';
import './assets/vazir-font.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<LoginPage />} />
        <Route path="/alarms" element={<AlarmPage />} />
      </Routes>
    </Router>
  );
};

export default App;
