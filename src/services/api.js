const API_BASE =
    import.meta.env.VITE_API_URL;

export default API_BASE;

export async function userLogin(
    email,
    password
) {

    const response =
        await fetch(
            `${API_BASE}/user/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

    return await response.json();
}