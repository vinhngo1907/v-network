const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Đặt URL backend NestJS ở .env

async function callAPI(method, url, token = null, data = null) {
    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers
    };

    if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
        config.body = JSON.stringify(data);
    }

    try {
        const res = await fetch(`${BASE_URL}${url}`, config);

        const resData = await res.json();

        if (!res.ok) {
            throw new Error(resData.message || "Request failed");
        }

        return resData;
    } catch (err) {
        throw err;
    }
}

export const getDataAPI = (url, token) => callAPI("GET", url, token);

export const postDataAPI = (url, data, token) => callAPI("POST", url, token, data);

export const putDataAPI = (url, data, token) => callAPI("PUT", url, token, data);

export const deleteDataAPI = (url, token) => callAPI("DELETE", url, token);