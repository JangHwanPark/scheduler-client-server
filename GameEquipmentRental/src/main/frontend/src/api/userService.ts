import {axiosInstance} from "./axiosInstance.ts";

/* Register API */
export const registerAPI = async (user: { id: string; password: string; name: string; phone: string }) => {
    try {
        // 회원가입 API 호출
        return await axiosInstance.post("/user/join", user);
    } catch (error) {
        console.error("Register error", error);
        return undefined;   // 오류 발생 시 undefined 반환
    }
}

/** LOGIN API */
export const loginAPI = async (credentials: { username: string; password: string }) => {
    try {
        // 로그인 API 호출
        return await axiosInstance.post("/login", credentials);
    } catch (error) {
        console.error("Login error", error);
        return undefined;   // 오류 발생 시 undefined 반환
    }
};

/** LOGOUT API */
export const logoutAPI = async () => {
    try {
        // 로그아웃 API 호출
        return await axiosInstance.post("/logout");
    } catch (error) {
        console.error("Logout error", error);
        return undefined;   // 오류 발생 시 undefined 반환
    }
};

/* Get User info */
export const getUserInfo = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            throw new Error("No access token found");
        }

        // 사용자 정보 요청
        return await axiosInstance.get("/info", {
            headers: {
                'access': `${accessToken}`
            }
        });
    } catch (error) {
        console.error("Failed to fetch user info", error);

        // 오류 발생 시 undefined 반환
        return undefined;
    }
};