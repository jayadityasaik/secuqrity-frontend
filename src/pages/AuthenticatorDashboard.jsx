import { useState } from "react";
import LiveVerification from "../components/LiveVerification";
import API_BASE from "../services/api";

function AuthenticatorDashboard() {

    const [biometricToken, setBiometricToken] =
        useState("");

    const [rightThumb, setRightThumb] =
        useState("");
    const [leftThumb, setLeftThumb] =
    useState("");

    async function captureRightThumb() {

    try {

        const response =
            await fetch(
                "http://127.0.0.1:5001/capture"
            );

        const result =
            await response.json();

        if (!result.success) {

            alert(
                "Fingerprint capture failed"
            );

            return;
        }

        setRightThumb(
            result.fingerprint
        );

        alert(
            "Right thumb captured"
        );

    } catch (error) {

        console.log(error);

        alert(
            "Capture Server not running"
        );
    }
}

    async function captureLeftThumb() {

    try {

        const response =
            await fetch(
                "http://127.0.0.1:5001/capture"
            );

        const result =
            await response.json();

        if (!result.success) {

            alert(
                "Fingerprint capture failed"
            );

            return;
        }

        setLeftThumb(
            result.fingerprint
        );

        alert(
            "Left thumb captured"
        );

    } catch (error) {

        console.log(error);

        alert(
            "Capture Server not running"
        );
    }
}

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
                                biometricToken,

                            right_thumb:
                                rightThumb,

                            left_thumb:
                                leftThumb
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
                        className="btn btn-primary me-2"
                        onClick={
                            captureRightThumb
                        }
                    >
                        Capture Right Thumb
                    </button>

                    <button
                        className="btn btn-info"
                        onClick={
                            captureLeftThumb
                        }
                    >
                        Capture Left Thumb
                    </button>

                    <br />
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

export default AuthenticatorDashboard;