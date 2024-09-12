import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://192.168.1.8:4000",
    headers: {
        "Access-Control-Allow-Origin": "http://pipemont-mobile-app.com",
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
