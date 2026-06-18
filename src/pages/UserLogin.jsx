import { useState } from "react";
import { userLogin } from "../services/api";
import Loader from "../components/Loader";
import API_BASE from "../services/api";
function UserLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleLogin() {

        try {

            setLoading(true);

            const result = await userLogin(
                email,
                password
            );

            localStorage.setItem(
                "user_email",
                email
            );

            localStorage.setItem(
                "user_password",
                password
            );

            alert(result.message);

            setTimeout(() => {

                window.location.href =
                    "/user-otp";

            }, 2000);

        } catch {

            setLoading(false);

            alert("Login Failed");
        }
    }

    if (loading) {

        return <Loader />;
    }

    return (

        <div className="container mt-5">

            <div
                className="card shadow-lg p-4 mx-auto"
                style={{ maxWidth: "500px" }}
            >

                <h2 className="text-center text-success">
                    User Login
                </h2>

                <hr />

                <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <br />

                <input
                    className="form-control"
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

                <br />

                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        setShowPassword(
                            !showPassword
                        )
                    }
                >
                    {
                        showPassword
                            ? "Hide Password"
                            : "Show Password"
                    }
                </button>

                <br />

                <button
                    className="btn btn-success"
                    onClick={handleLogin}
                >
                    Login
                </button>

            </div>

        </div>
    );
}

export default UserLogin;
