import { useState } from "react";
import { generateQR } from "../services/qrService";
import API_BASE from "../services/api";

function UserDashboard() {

    const [qrData, setQrData] =
        useState(null);

    async function handleGenerateQR() {

        try {

            const email =
                localStorage.getItem(
                    "user_email"
                );

            const password =
                localStorage.getItem(
                    "user_password"
                );

            const result =
                await generateQR(
                    email,
                    password
                );

            if (result.detail) {

                alert(
                    result.detail
                );

                return;
            }

            setQrData(result);

        } catch (error) {

            alert(
                "QR Generation Failed"
            );
        }
    }

    function downloadPDF() {

        if (!qrData) {

            alert(
                "Generate QR First"
            );

            return;
        }

        const fileUrl =
            `${API_BASE}/${qrData.pdf_path}`;

        window.open(
            fileUrl,
            "_blank"
        );
    }

    function handleLogout() {

        localStorage.clear();

        window.location.href = "/";
    }

    return (

        <div
            className="
            cyber-bg
            container-fluid
            py-5"
        >

            <div
                className="
                glass-card
                p-5
                mx-auto"
                style={{
                    maxWidth: "1200px"
                }}
            >

                <div
                    className="
                    d-flex
                    justify-content-between
                    align-items-center"
                >

                    <div>

                        <h1
                            className="
                            logo-glow"
                        >
                            User Dashboard
                        </h1>

                        <p
                            className="
                            text-secondary"
                        >
                            Secure Biometric
                            Authentication Portal
                        </p>

                    </div>

                    <button
                        className="
                        cyber-btn"
                        onClick={
                            handleLogout
                        }
                    >
                        Logout
                    </button>

                </div>

                <hr
                    style={{
                        borderColor:
                        "#1e3a8a"
                    }}
                />

                <div
                    className="
                    text-center
                    mt-4"
                >

                    <img
                        src="/fingerprint.png"
                        width="150"
                        alt="Fingerprint"
                    />

                    <h3
                        className="
                        mt-3"
                    >
                        Generate Your
                        Secure QR
                    </h3>

                    <button
                        className="
                        cyber-btn
                        mt-3"
                        onClick={
                            handleGenerateQR
                        }
                    >
                        Generate Secure QR
                    </button>

                </div>

                {

                    qrData && (

                        <div
                            className="
                            glass-card
                            mt-5
                            p-4"
                        >

                            <h2
                                className="
                                text-success"
                            >
                                QR Generated
                                Successfully
                            </h2>

                            <hr />

                            <div
                                className="
                                row"
                            >

                                <div
                                    className="
                                    col-md-6"
                                >

                                    <h5>
                                        PDF Password
                                    </h5>

                                    <p>
                                        {
                                            qrData
                                            .pdf_password
                                        }
                                    </p>

                                </div>

                                <div
                                    className="
                                    col-md-6"
                                >

                                    <h5>
                                        Biometric Token
                                    </h5>

                                    <p>
                                        {
                                            qrData
                                            .biometric_token
                                        }
                                    </p>

                                </div>

                            </div>

                            <button
                                className="
                                cyber-btn
                                mt-3"
                                onClick={
                                    downloadPDF
                                }
                            >
                                Download
                                QR PDF
                            </button>

                        </div>

                    )

                }

            </div>

        </div>
    );
}

export default UserDashboard;