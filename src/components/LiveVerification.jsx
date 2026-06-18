import API_BASE from "../services/api";
import React, { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function LiveVerification() {

    const [qrData, setQrData] =
        useState("");

    const [result, setResult] =
        useState("");

    function startScanner() {

        const scanner =
            new Html5QrcodeScanner(
                "reader",
                {
                    fps: 10,
                    qrbox: 250
                },
                false
            );

        scanner.render(

            async (decodedText) => {

                await scanner.clear();

                setQrData(
                    decodedText
                );

                setResult(
                    "QR SCANNED SUCCESSFULLY"
                );
            },

            (error) => {
                console.log(error);
            }
        );
    }

    async function verifyUser() {

        try {

            const token =
                localStorage.getItem(
                    "authenticator_token"
                );

            const response =
                await fetch(
                    `${API_BASE}/verification/verify`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`
                        },

                        body: JSON.stringify({

                            encrypted_qr_data:
                                qrData
                        })
                    }
                );

            const data =
                await response.json();

            if (response.ok) {

                setResult(

                    data.status +
                    "\n\nUser: " +
                    data.user +
                    "\n\nEmail: " +
                    data.email
                );

            } else {

                setResult(
                    data.detail
                );
            }

        } catch (error) {

            console.log(error);

            setResult(
                "Verification Failed"
            );
        }
    }

    return (

        <div
            style={{
                padding: "20px"
            }}
        >

            <h2>
                Live Verification
            </h2>

            <button
                onClick={startScanner}
            >
                Open QR Scanner
            </button>

            <div
                id="reader"
                style={{
                    width: "400px",
                    marginTop: "20px"
                }}
            />

            <br />

            <button
                onClick={verifyUser}
            >
                Verify Identity
            </button>

            <br />
            <br />

            <textarea
                value={result}
                readOnly
                rows={10}
                cols={60}
            />

        </div>
    );
}

export default LiveVerification;

