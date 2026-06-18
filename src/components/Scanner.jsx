import React, { useEffect, useState } from "react";
import API_BASE from "../services/api";
import { Html5QrcodeScanner } from "html5-qrcode";

function Scanner() {

    const [scanResult, setScanResult] = useState("");

    const [verificationResult, setVerificationResult] = useState("");

    useEffect(() => {

        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 5,
                qrbox: {
                    width: 250,
                    height: 250,
                },
            },
            false
        );

        scanner.render(

            async (decodedText) => {

                setScanResult(decodedText);

                try {

                    const response = await fetch(
                        `${API_BASE}/verification/verify-qr`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type": "application/json",
                            },

                            body: JSON.stringify({
                                qr_data: decodedText,
                            }),
                        }
                    );

                    const data = await response.json();

                    setVerificationResult(
                        data.authentication
                    );

                } catch (error) {

                    console.log(error);
                }
            },

            (error) => {

                console.log(error);
            }
        );

        return () => {

            scanner.clear()
                .catch((error) => {

                    console.log(error);
                });
        };

    }, []);

    return (

        <div className="container">

            <h1>secuQRity QR Scanner</h1>

            <div
                id="reader"
                style={{
                    width: "400px"
                }}
            />

            <h2>Scanned QR:</h2>

            <p>{scanResult}</p>

            <h2>Verification Result:</h2>

            <p
                style={{
                    color: "green",
                    fontWeight: "bold"
                }}
            >
                {verificationResult}
            </p>

        </div>
    );
}

export default Scanner;

