import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { loginAPI, logoutAPI } from "../api/userService.ts";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useCookies } from "react-cookie";

// JWT 디코딩 타입 정의
interface JwtPayload {
    exp: number;
}

// 컨텍스트 API 타입 정의
interface AuthContextType {
    accessToken: string | null;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
    getRemainingTime?: () => number | null;
}

// 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 프로바이더 생성
export function AuthProvider({ children }: { children: ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken"));
    const [cookies, setCookie, removeCookie] = useCookies(["refresh"]);

    useEffect(() => {
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        } else {
            localStorage.removeItem("accessToken");
            delete axios.defaults.headers.common["Authorization"];
        }

        // 쿠키에서 refreshToken을 읽어서 상태에 저장
        const refreshToken = cookies.refresh;
        if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
        }
    }, [accessToken, cookies.refresh]);

    const login = async (credentials: { username: string; password: string }) => {
        const response = await loginAPI(credentials);

        if (response && response.status === 200) {
            const accessToken = response.headers["access"];
            const refreshToken = cookies.refresh;

            setAccessToken(accessToken);
            console.log("Access Token:", accessToken);

            // 쿠키에 리프레시 토큰 설정
            setCookie("refresh", refreshToken, { path: "/", secure: true, sameSite: "strict" });
            console.log("Refresh Token:", refreshToken);
        } else {
            console.error("Login failed with status: " + response?.status);
        }
    };

    const logout = async () => {
        try {
            const response = await logoutAPI();
            if (response && response.status === 200) {
                setAccessToken(null);
                removeCookie("refresh");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            } else {
                console.error("Logout failed with status: " + response?.status);
            }
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    const getRemainingTime = (): number | null => {
        if (!accessToken) return null;
        const decoded = jwtDecode<JwtPayload>(accessToken);
        const currentTime = Date.now() / 1000;
        const remainingTime = decoded.exp - currentTime;
        return remainingTime > 0 ? remainingTime : 0;
    };

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, getRemainingTime }}>
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