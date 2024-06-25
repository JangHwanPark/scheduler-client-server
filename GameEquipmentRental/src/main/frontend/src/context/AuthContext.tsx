import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import axios from "axios";
// import axiosInstance from "../api/axiosInstance.ts";
// import {logout} from "../api/axiosInstance.ts";

// 컨텍스트 API 타입 정의
interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
}

// 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 프로바이더 생성
export function AuthProvider({ children }: { children: ReactNode }) {
    // accessToken, refreshToken 상태 저장
    const [accessToken, setAccessToken] = useState<string | null>(
        localStorage.getItem("accessToken")
    );
    const [refreshToken, setRefreshToken] = useState<string | null>(
        localStorage.getItem("refreshToken")
    );

    // accessToken, refreshToken 이 변경될 때 마다 로컬 스토리지에 저장
    useEffect(() => {
        accessToken
            ? localStorage.setItem("accessToken", accessToken)
            : localStorage.removeItem("accessToken");

        refreshToken
            ? localStorage.setItem("refreshToken", refreshToken)
            : localStorage.removeItem("refreshToken");
    }, [accessToken, refreshToken]);

    // 로그인 함수 : 서버에 로그인 요청을 보내고 성공시 토큰을 상태에 저장
    const login = async (credentials: { username: string; password: string }) => {
        try {
            const response = await axios.post(
                "http://localhost:8081/login",
                credentials, {
                headers: { "Content-Type": "application/json" },

                // 요청에 쿠키 포함
                withCredentials: true
            });

            if (response.status === 200) {
                console.log("Res:", response);
                console.log("Res headers:", response.headers);

                const accessToken = response.headers["access"];
                const refreshToken = getCookie("refresh");
                const test = response.headers["Set-Cookie"];

                console.log("Access Token:", accessToken);
                console.log("Refresh Token:", refreshToken);

                if (accessToken && refreshToken) {
                    setAccessToken(accessToken);
                    setRefreshToken(refreshToken);
                }
            } else {
                console.error("Login failed with status: " + response.status);
            }
        } catch (error) {
            console.error("Login error", error);
        }
    };

    // 로그아웃 함수: 토큰을 상태에서 제거하고 서버에 로그아웃 요청을 보냄
    const logout = async () => {
        try {
            // await logout();
            const response = await axios.post(`http://localhost:8081/logout`);
            setAccessToken(null);
            setRefreshToken(null);

            return response;
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    // 쿠키에서 값을 가져오는 함수
    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
        return null;
    };

    // AuthContext.Provider로 자식 컴포넌트들에게 인증 상태와 메서드를 제공
    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// useAuth 훅: AuthContext를 쉽게 사용할 수 있도록 해주는 훅
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};