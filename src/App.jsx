import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "./pages/Home";

import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";
import UserOTP from "./pages/UserOTP";
import UserDashboard from "./pages/UserDashboard";

import AdminLogin from "./pages/AdminLogin";
import AdminOTP from "./pages/AdminOTP";
import AdminDashboard from "./pages/AdminDashboard";

import AuthenticatorLogin from "./pages/AuthenticatorLogin";
import AuthenticatorOTP from "./pages/AuthenticatorOTP";
import AuthenticatorDashboard from "./pages/AuthenticatorDashboard";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/user-register"
                    element={<UserRegister />}
                />

                <Route
                    path="/user-login"
                    element={<UserLogin />}
                />

                <Route
                    path="/user-otp"
                    element={<UserOTP />}
                />

                <Route
                    path="/dashboard"
                    element={<UserDashboard />}
                />

                <Route
                    path="/admin-login"
                    element={<AdminLogin />}
                />

                <Route
                    path="/admin-otp"
                    element={<AdminOTP />}
                />

                <Route
                    path="/admin-dashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/authenticator-login"
                    element={<AuthenticatorLogin />}
                />

                <Route
                    path="/authenticator-otp"
                    element={<AuthenticatorOTP />}
                />

                <Route
                    path="/authenticator-dashboard"
                    element={<AuthenticatorDashboard />}
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;
