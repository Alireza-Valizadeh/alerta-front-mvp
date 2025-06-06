import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/app/login" replace />;
  }

  return children;
};

export default PrivateRoute;
