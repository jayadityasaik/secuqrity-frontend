import { useState } from "react";
import API_BASE from "../services/api";
function UserRegister() {

    const [fullName,
        setFullName] = useState("");

    const [email,
        setEmail] = useState("");

    const [dob,
        setDob] = useState("");

    const [password,
        setPassword] = useState("");

    const [showPassword,
        setShowPassword] = useState(false);

    async function registerUser() {

        try {

            const response =
                await fetch(
                    `${API_BASE}/user/register`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            full_name:
                                fullName,

                            email:
                                email,

                            dob:
                                dob,

                            password:
                                password
                        })
                    }
                );

            const data =
                await response.json();

            if (response.ok) {

                alert(
                    "Registration Successful\n\nBiometric Token Sent To Email"
                );

                window.location.href =
                    "/user-login";

            } else {

                alert(
                    data.detail
                );
            }

        } catch (error) {

            alert(
                "Registration Failed"
            );
        }
    }

    return (

        <div>

            <h1>
                User Registration
            </h1>

            <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) =>
                    setFullName(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <input
                type="date"
                value={dob}
                onChange={(e) =>
                    setDob(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <input
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

            <button
                type="button"
                onClick={() =>
                    setShowPassword(
                        !showPassword
                    )
                }
            >
                {
                    showPassword
                        ? "Hide"
                        : "Show"
                }
            </button>

            <br />
            <br />

            <button
                onClick={
                    registerUser
                }
            >
                Register
            </button>

        </div>
    );
}

export default UserRegister;

