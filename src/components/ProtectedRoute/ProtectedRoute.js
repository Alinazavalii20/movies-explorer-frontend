import React from "react";
import {  Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children, isTokenChecking }) => {
  return isTokenChecking? 'Loading...' : isLoggedIn ? children : <Navigate to="/signin" />
}

export default ProtectedRoute;