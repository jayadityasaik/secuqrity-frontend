import { Link } from "react-router-dom";

function Home() {

    return (

        <div
            className="container text-center"
            style={{
                marginTop: "80px"
            }}
        >

            <img
                src="/fingerprint.png"
                alt="secuQRity"
                style={{
                    width: "120px",
                    marginBottom: "20px"
                }}
            />

            <h1 className="hero-title">
                secuQRity
            </h1>

            <p className="hero-subtitle">
                Secure Biometric QR Authentication System
            </p>

            <div
                className="dashboard-card"
                style={{
                    maxWidth: "700px",
                    margin: "auto"
                }}
            >

                <h3
                    style={{
                        color: "#4da3ff"
                    }}
                >
                    Multi-Factor Identity Verification
                </h3>

                <p
                    style={{
                        color: "#cbd5e1"
                    }}
                >
                    OTP + Biometric Authentication +
                    Encrypted QR Verification
                </p>

                <hr />

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        alignItems: "center"
                    }}
                >

                    <Link
                        to="/user-register"
                        className="glow-button"
                    >
                        User Registration
                    </Link>

                    <Link
                        to="/user-login"
                        className="glow-button"
                    >
                        User Login
                    </Link>

                    <Link
                        to="/authenticator-login"
                        className="glow-button"
                    >
                        Authenticator Login
                    </Link>

                    <Link
                        to="/admin-login"
                        className="glow-button"
                    >
                        Admin Login
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Home;