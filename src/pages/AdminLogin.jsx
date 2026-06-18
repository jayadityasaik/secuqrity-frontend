import { useState } from "react";
import Loader from "../components/Loader";
import API_BASE from "../services/api";
function AdminLogin() {

    const [adminId, setAdminId] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [showPassword,
        setShowPassword] =
        useState(false);

    const [loading,
        setLoading] =
        useState(false);

    async function handleLogin() {

        try {

            setLoading(true);

            const response = await fetch(
                `${API_BASE}/admin/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        admin_id: adminId,
                        password: password
                    })
                }
            );

            const result =
                await response.json();

            if (response.ok) {

                localStorage.setItem(
                    "admin_id",
                    adminId
                );

                alert(
                    result.message
                );

                setTimeout(() => {

                    window.location.href =
                        "/admin-otp";

                }, 2000);

            } else {

                setLoading(false);

                alert(
                    result.detail
                );
            }

        } catch {

            setLoading(false);

            alert(
                "Admin Login Failed"
            );
        }
    }

    if (loading) {

        return <Loader />;
    }

    return (

        <div className="container mt-5">

            <div
                className="card shadow-lg p-4 mx-auto"
                style={{ maxWidth: "500px" }}
            >

                <h2 className="text-center text-danger">
                    Admin Login
                </h2>

                <hr />

                <input
                    className="form-control"
                    placeholder="Admin ID"
                    value={adminId}
                    onChange={(e) =>
                        setAdminId(
                            e.target.value
                        )
                    }
                />

                <br />

                <input
                    className="form-control"
                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                />

                <br />

                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        setShowPassword(
                            !showPassword
                        )
                    }
                >
                    Show / Hide Password
                </button>

                <br />

                <button
                    className="btn btn-danger"
                    onClick={handleLogin}
                >
                    Login
                </button>

            </div>

        </div>
    );
}

export default AdminLogin;
