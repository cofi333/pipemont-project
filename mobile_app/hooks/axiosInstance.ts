import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
    headers: {
        Referer: "http://pipemont-mobile-app.com",
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
