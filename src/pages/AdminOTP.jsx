import { useState } from "react";
import API_BASE from "../services/api";
function AdminOTP() {

    const [otp, setOtp] = useState("");

    async function verifyOTP() {

        try {

            const response = await fetch(
                `${API_BASE}/admin/verify-login-otp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        otp: otp
                    })
                }
            );

            const result = await response.json();

            if (response.ok) {

                localStorage.setItem(
                    "admin_token",
                    result.access_token
                );

                alert(result.message);

                window.location.href =
                    "/admin-dashboard";

            } else {

                alert(result.detail);
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
                Admin OTP Verification
            </h1>

            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                    setOtp(e.target.value)
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

export default AdminOTP;
