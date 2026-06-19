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
                    "https://127.0.0.1:11100/capture",
                    {
                        method: "CAPTURE",

                        headers: {
                            "Content-Type":
                                "text/xml"
                        },

                        body:
                            `<PidOptions ver='1.0'>
                                <Opts
                                    fCount='1'
                                    fType='0'
                                    iCount='0'
                                    pCount='0'
                                    format='0'
                                    pidVer='2.0'
                                    timeout='10000'
                                    posh='UNKNOWN'
                                    env='P'
                                />
                             </PidOptions>`
                    }
                );

            const xml =
                await response.text();

            const match =
                xml.match(
                    /<Data type="X">(.*?)<\/Data>/s
                );

            if (!match) {

                alert(
                    "Right thumb capture failed"
                );

                return;
            }

            setRightThumb(
                match[1]
            );

            alert(
                "Right thumb captured"
            );

        } catch (error) {

            alert(
                "Morpho RD Service not running"
            );
        }
    }

    async function captureLeftThumb() {

        try {

            const response =
                await fetch(
                    "https://127.0.0.1:11100/capture",
                    {
                        method: "CAPTURE",

                        headers: {
                            "Content-Type":
                                "text/xml"
                        },

                        body:
                            `<PidOptions ver='1.0'>
                                <Opts
                                    fCount='1'
                                    fType='0'
                                    iCount='0'
                                    pCount='0'
                                    format='0'
                                    pidVer='2.0'
                                    timeout='10000'
                                    posh='UNKNOWN'
                                    env='P'
                                />
                             </PidOptions>`
                    }
                );

            const xml =
                await response.text();

            const match =
                xml.match(
                    /<Data type="X">(.*?)<\/Data>/s
                );

            if (!match) {

                alert(
                    "Left thumb capture failed"
                );

                return;
            }

            setLeftThumb(
                match[1]
            );

            alert(
                "Left thumb captured"
            );

        } catch {

            alert(
                "Morpho RD Service not running"
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