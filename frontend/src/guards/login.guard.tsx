import type { JSX } from "react";
import { Navigate } from "react-router-dom";


interface LoginGuardProps {
    children: JSX.Element;
}

const LoginGuard = ({ children }: LoginGuardProps) => {
    const token = localStorage.getItem('token');
    if (token) { 
        return <Navigate to ='/home' replace />
    } else {
        return children;
    }
};

export default LoginGuard;