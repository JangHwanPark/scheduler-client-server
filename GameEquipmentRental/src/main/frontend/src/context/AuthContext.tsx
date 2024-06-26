import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { loginAPI, logoutAPI } from "../api/userService.ts";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

// JWT 디코딩 타입 정의
interface JwtPayload {
    exp: number;
}

// 컨텍스트 API 타입 정의
export interface AuthContextType {
    accessToken: string | null;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
    checkLogin: () => Promise<void>;
    getRemainingTime?: () => number | null;
}



// 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);



// 프로바이더 생성
export function AuthProvider({ children }: { children: ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken"));


    useEffect(() => {
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        } else {
            localStorage.removeItem("accessToken");
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [accessToken]);


    const login = async (credentials: { username: string; password: string }) => {
        const response = await loginAPI(credentials);
        if (response && response.status === 200) {
            const accessToken = response.headers["access"];
            setAccessToken(accessToken);
            console.log("Access Token:", accessToken);
        } else {
            console.error("Login failed with status: " + response?.status);
        }
    };


    // 로그아웃
    const logout = async () => {
        try {
            const response = await logoutAPI();
            if (response && response.status === 200) {
                setAccessToken(null);
                localStorage.removeItem("accessToken");
            } else {
                console.error("Logout failed with status: " + response?.status);
            }
        } catch (error) {
            console.error("Logout error", error);
        }
    };


    // 로그인 체크
    const checkLogin= async () => {
        if (!accessToken) {
            const response = await axios.post(
                "http://localhost:8081/reissue",
                {},
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                const newAccessToken = response.data.accessToken;
                const newRefreshToken = response.data.refreshToken;

                setAccessToken(newAccessToken);
                localStorage.setItem("accessToken", newAccessToken);
                localStorage.setItem("refreshToken", newRefreshToken);
            }
        }
    }


    const getRemainingTime = (): number | null => {
        if (!accessToken) return null;
        const decoded = jwtDecode<JwtPayload>(accessToken);
        const currentTime = Date.now() / 1000;
        const remainingTime = decoded.exp - currentTime;
        return remainingTime > 0 ? remainingTime : 0;
    };


    return (
        <AuthContext.Provider value={{ accessToken, login, logout, checkLogin, getRemainingTime }}>
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