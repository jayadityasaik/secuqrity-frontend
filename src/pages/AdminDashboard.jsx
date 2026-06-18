import { useState } from "react";
import API_BASE from "../services/api";
function AdminDashboard() {

    const [users, setUsers] = useState([]);
    const [logs, setLogs] = useState([]);
    const [authenticators, setAuthenticators] = useState([]);

    const [authName, setAuthName] = useState("");
    const [authEmail, setAuthEmail] = useState("");

    const token =
        localStorage.getItem(
            "admin_token"
        );

    async function createAuthenticator() {

        try {

            const response =
                await fetch(
                    `${API_BASE}/admin/create-authenticator",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`
                        },

                        body: JSON.stringify({

                            authenticator_name:
                                authName,

                            email:
                                authEmail
                        })
                    }
                );

            const data =
                await response.json();

            alert(
                data.message
            );

            loadAuthenticators();

        } catch {

            alert(
                "Create Authenticator Failed"
            );
        }
    }

    async function loadAuthenticators() {

        const response =
            await fetch(
                `${API_BASE}/admin/all-authenticators",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        setAuthenticators(
            Array.isArray(data)
                ? data
                : []
        );
    }

    async function loadUsers() {

        const response =
            await fetch(
                `${API_BASE}/admin/all-users",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        setUsers(
            Array.isArray(data)
                ? data
                : []
        );
    }

    async function loadLogs() {

        const response =
            await fetch(
                `${API_BASE}/admin/authentication-logs",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        setLogs(
            Array.isArray(data)
                ? data
                : []
        );
    }

    async function deleteAuthenticator(id) {

        await fetch(
            `${API_BASE}/admin/delete-authenticator/${id}`,
            {
                method: "DELETE",

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        loadAuthenticators();
    }

    async function deleteUser(email) {

        await fetch(
            `${API_BASE}/admin/delete-user/${email}`,
            {
                method: "DELETE",

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        loadUsers();
    }

    async function rotateKey() {

        const response =
            await fetch(
                `${API_BASE}/admin/rotate-key",
                {
                    method: "POST",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        alert(
            JSON.stringify(data)
        );
    }

    function logout() {

        localStorage.clear();

        window.location.href = "/";
    }

    return (

        <div
            className="
            cyber-bg
            container-fluid
            py-4"
        >

            <div
                className="
                glass-card
                p-4"
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
                            Admin Dashboard
                        </h1>

                        <p
                            className="
                            text-secondary"
                        >
                            Security Management
                            Center
                        </p>

                    </div>

                    <button
                        className="
                        cyber-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

                <hr />

                <div
                    className="
                    row
                    text-center
                    mb-4"
                >

                    <div
                        className="
                        col-md-4"
                    >
                        <div
                            className="
                            glass-card
                            p-3"
                        >
                            <h2>
                                {users.length}
                            </h2>

                            <p>
                                Users
                            </p>
                        </div>
                    </div>

                    <div
                        className="
                        col-md-4"
                    >
                        <div
                            className="
                            glass-card
                            p-3"
                        >
                            <h2>
                                {
                                    authenticators.length
                                }
                            </h2>

                            <p>
                                Authenticators
                            </p>
                        </div>
                    </div>

                    <div
                        className="
                        col-md-4"
                    >
                        <div
                            className="
                            glass-card
                            p-3"
                        >
                            <h2>
                                {logs.length}
                            </h2>

                            <p>
                                Logs
                            </p>
                        </div>
                    </div>

                </div>

                <div
                    className="
                    glass-card
                    p-4
                    mb-4"
                >

                    <h3>
                        Create Authenticator
                    </h3>

                    <input
                        className="
                        form-control"
                        placeholder="Name"
                        value={authName}
                        onChange={(e) =>
                            setAuthName(
                                e.target.value
                            )
                        }
                    />

                    <br />

                    <input
                        className="
                        form-control"
                        placeholder="Email"
                        value={authEmail}
                        onChange={(e) =>
                            setAuthEmail(
                                e.target.value
                            )
                        }
                    />

                    <br />

                    <button
                        className="
                        cyber-btn"
                        onClick={
                            createAuthenticator
                        }
                    >
                        Create
                    </button>

                </div>

                <div
                    className="
                    d-flex
                    gap-3
                    flex-wrap
                    mb-4"
                >

                    <button
                        className="
                        cyber-btn"
                        onClick={
                            loadUsers
                        }
                    >
                        Load Users
                    </button>

                    <button
                        className="
                        cyber-btn"
                        onClick={
                            loadAuthenticators
                        }
                    >
                        Load Authenticators
                    </button>

                    <button
                        className="
                        cyber-btn"
                        onClick={
                            loadLogs
                        }
                    >
                        Load Logs
                    </button>

                    <button
                        className="
                        cyber-btn"
                        onClick={
                            rotateKey
                        }
                    >
                        Rotate Key
                    </button>

                </div>

                <div
                    className="
                    glass-card
                    p-3
                    mb-4"
                >

                    <h3>
                        Users
                    </h3>

                    {users.map(
                        (
                            user,
                            index
                        ) => (

                            <div
                                key={index}
                                className="
                                border-bottom
                                p-2"
                            >

                                <strong>
                                    {
                                        user.full_name
                                    }
                                </strong>

                                <br />

                                {
                                    user.email
                                }

                                <br />

                                <button
                                    className="
                                    btn
                                    btn-danger
                                    btn-sm
                                    mt-2"
                                    onClick={() =>
                                        deleteUser(
                                            user.email
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </div>
                        )
                    )}

                </div>

                <div
                    className="
                    glass-card
                    p-3
                    mb-4"
                >

                    <h3>
                        Authenticators
                    </h3>

                    {authenticators.map(
                        (
                            auth,
                            index
                        ) => (

                            <div
                                key={index}
                                className="
                                border-bottom
                                p-2"
                            >

                                {
                                    auth.authenticator_id ||
                                    auth.username
                                }

                                <br />

                                {
                                    auth.email
                                }

                                <br />

                                <button
                                    className="
                                    btn
                                    btn-danger
                                    btn-sm
                                    mt-2"
                                    onClick={() =>
                                        deleteAuthenticator(
                                            auth.authenticator_id ||
                                            auth.username
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </div>
                        )
                    )}

                </div>

                <div
                    className="
                    glass-card
                    p-3"
                >

                    <h3>
                        Authentication Logs
                    </h3>

                    {logs.map(
                        (
                            log,
                            index
                        ) => (

                            <div
                                key={index}
                                className="
                                border-bottom
                                p-2"
                            >

                                {
                                    JSON.stringify(
                                        log
                                    )
                                }

                            </div>
                        )
                    )}

                </div>

            </div>

        </div>
    );
}
<div className="dashboard-card">

    <h1>
        Admin Dashboard
    </h1>

    ...
</div>

export default AdminDashboard;
