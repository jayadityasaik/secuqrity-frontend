import API_BASE from "./api";

export async function generateQR(
    email,
    password
) {

    const response =
        await fetch(
            `${API_BASE}/qr/generate`,
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