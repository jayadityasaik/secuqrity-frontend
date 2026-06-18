import { useState } from "react";
import LiveVerification from "../components/LiveVerification";
import API_BASE from "../services/api";
function AuthenticatorDashboard() {

    const [biometricToken,
        setBiometricToken] = useState("");

    async function enrollUser() {

        try {

            const token =
                localStorage.getItem(
                    "authenticator_token"
                );

            const response =
                await fetch(
                    `${API_BASE}/authenticator/enroll-user`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`
                        },

                        body: JSON.stringify({
                            biometric_token:
                                biometricToken
                        })
                    }
                );

            const data =
                await response.json();

            alert(
                data.message ||
                data.detail
            );

        } catch {

            alert(
                "Enrollment Failed"
            );
        }
    }

    function logout() {

        localStorage.clear();

        window.location.href = "/";
    }

    return (

        <div className="container mt-4">

            <div className="card shadow-lg p-4">

                <div className="d-flex justify-content-between">

                    <h2 className="text-warning">
                        Authenticator Dashboard
                    </h2>

                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

                <hr />

                <div className="card p-3">

                    <h4>
                        User Enrollment
                    </h4>

                    <input
                        className="form-control"
                        placeholder="Biometric Token"
                        value={biometricToken}
                        onChange={(e) =>
                            setBiometricToken(
                                e.target.value
                            )
                        }
                    />

                    <br />

                    <button
                        className="btn btn-success"
                        onClick={enrollUser}
                    >
                        Enroll User
                    </button>

                </div>

                <hr />

                <LiveVerification />

            </div>

        </div>
    );
}
<div className="dashboard-card">

    <h1>
        Authenticator Dashboard
    </h1>

    ...
</div>
export default AuthenticatorDashboard;

