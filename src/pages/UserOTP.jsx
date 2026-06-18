import { useState } from "react";
import API_BASE from "../services/api";
function UserOTP() {

    const [otp, setOtp] = useState("");

    async function verifyOTP() {

        try {

            const response = await fetch(
                `${API_BASE}/user/verify-otp",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({
                        email:
                        localStorage.getItem(
                            "user_email"
                        ),

                        otp: otp
                    })
                }
            );

            const result =
                await response.json();

            window.location.href = "/dashboard";

        } catch (error) {

            alert(
                "OTP Verification Failed"
            );
        }
    }

    return (
        <div>

            <h1>
                OTP Verification
            </h1>

            <input
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

export default UserOTP;
