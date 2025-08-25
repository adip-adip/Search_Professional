import React from "react";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("Redirecting to login");
    return <Navigate to="/" replace />;
  }


  return <>{children}</>;
};

export default AuthGuard;
