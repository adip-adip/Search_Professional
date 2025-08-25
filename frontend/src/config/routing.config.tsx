import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProfessionalSearch from "../pages/home/home.pages";
import NotFoundPage from "../pages/error/notfound.pages";
import LoginPage from "../pages/auth/login/login.pages";
import RegisterPage from "../pages/auth/register/register.pages";
import { ToastContainer } from "react-toastify";
import ProfilePage from "../pages/profile/profile_edit/profile_edit.pages";
import ViewProfile from "../pages/profile/viewProfile/profile.pages";
import AuthGuard from "../guards/auth.guard";
import LoginGuard from "../guards/login.guard";

const RoutingConfig = () => {
    return (<>
        <BrowserRouter>
            <ToastContainer />

            <Routes>
                <Route path='/' element={<Navigate to="/login" replace />} />

                <Route path='/login' element={
                    <LoginGuard>
                        <LoginPage />
                    </LoginGuard>
                } />

                <Route path='/register' element={
                    <LoginGuard>
                        <RegisterPage />
                    </LoginGuard>
                } />
                <Route
                    path="/home"
                    element={
                        <AuthGuard>
                            <ProfessionalSearch />
                        </AuthGuard>
                    }
                />
                <Route
                    path="/update/:id"
                    element={
                        <AuthGuard>
                            <ProfilePage />
                        </AuthGuard>
                    }
                />
                <Route
                    path="/profile/:id"
                    element={
                        <AuthGuard>
                            <ViewProfile />
                        </AuthGuard>
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    </>)
}

export default RoutingConfig;