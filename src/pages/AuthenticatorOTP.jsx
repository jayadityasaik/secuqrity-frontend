import { useState } from "react";
import API_BASE from "../services/api";
function AuthenticatorOTP() {

    const [otp, setOtp] = useState("");

    async function verifyOTP() {

        try {

            const username =
                localStorage.getItem(
                    "authenticator_username"
                );

            const response = await fetch(
                `${API_BASE}/authenticator/verify-login-otp",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username: username,
                        otp: otp
                    })
                }
            );

            const result =
                await response.json();

            if (response.ok) {

                localStorage.setItem(
                    "authenticator_token",
                    result.access_token
                );

                alert(
                    result.message
                );

                window.location.href =
                    "/authenticator-dashboard";

            } else {

                alert(
                    result.detail
                );
            }

        } catch (error) {

            alert(
                "OTP Verification Failed"
            );
        }
    }

    return (

        <div>

            <h1>
                Authenticator OTP Verification
            </h1>

            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                    setOtp(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <button
                onClick={verifyOTP}
            >
                Verify OTP
            </button>

        </div>
    );
}

export default AuthenticatorOTP;
