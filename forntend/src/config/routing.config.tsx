import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProfessionalSearch from "../pages/home/home.pages";
import NotFoundPage from "../pages/error/notfound.pages";
import LoginPage from "../pages/auth/login/login.pages";
import RegisterPage from "../pages/auth/register/register.pages";
import AdminLayout from "../pages/layouts/admin.layout";
import { ToastContainer } from "react-toastify";
import ProfilePage from "../pages/profile/profile_edit/profile_edit.pages";
import ViewProfile from "../pages/profile/viewProfile/profile.pages";

const RoutingConfig = () => {
    return(<>
        <BrowserRouter>
        <ToastContainer/>
            <Routes>
                <Route path="/" element={<LoginPage/>}></Route>
                <Route path = "/register" element={<RegisterPage/>} /> 
                <Route path= "/home" element = {<ProfessionalSearch/>}/>
                <Route path="/update/:id" element={<ProfilePage/>} />
                <Route path= "*" element = {<NotFoundPage/>} />
                <Route path = "/profile/:id" element = {<ViewProfile/>} />
                <Route path = "/admin" element = {<AdminLayout/>} />
            </Routes>
        </BrowserRouter>
    </>)
}

export default RoutingConfig;