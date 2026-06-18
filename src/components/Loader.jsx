import "./Loader.css";

function Loader() {

    return (

        <div className="loader-container">

            <div className="scanner-wrapper">

                <img
                    src="/fingerprint.png"
                    alt="Fingerprint"
                    className="fingerprint-image"
                />

                <div className="scan-line"></div>

            </div>

            <h2>
                secuQRity
            </h2>

            <p>
                Biometric Verification In Progress...
            </p>

        </div>
    );
}

export default Loader;
