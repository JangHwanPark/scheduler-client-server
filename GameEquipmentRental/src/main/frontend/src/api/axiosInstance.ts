import axios from 'axios';

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081',
    //timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`
    },

    // 요청에 쿠키 포함
    withCredentials: true
});

/** LOGIN API */
export const loginAPI = async (credentials: { username: string; password: string }) => {
    try {
        const response = await axios.post(
            "http://localhost:8081/login",
            credentials, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true // 요청에 쿠키 포함
            });

        return response;
    } catch (error) {
        console.error("Login error", error);
    }
};

export const logout = async () => {

    const response = await axiosInstance.post(`/logout`);
    console.log(response);
    console.log(response.data);
    return response;
}

export default axiosInstance;