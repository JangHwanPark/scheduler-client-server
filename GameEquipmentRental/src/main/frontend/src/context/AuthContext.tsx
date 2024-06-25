import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import {loginAPI, logoutAPI} from "../api/axiosInstance.ts";
import {jwtDecode} from "jwt-decode";

// JWT 디코딩 타입 정의
interface JwtPayload {
    exp: number;
}

// 컨텍스트 API 타입 정의
interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
    getRemainingTime?: () => number | null;
}

// 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 프로바이더 생성
export function AuthProvider({ children }: { children: ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(
        localStorage.getItem("accessToken")
    );
    const [refreshToken, setRefreshToken] = useState<string | null>(
        localStorage.getItem("refreshToken")
    );

    useEffect(() => {
        accessToken
            ? localStorage.setItem("accessToken", accessToken)
            : localStorage.removeItem("accessToken");

        refreshToken
            ? localStorage.setItem("refreshToken", refreshToken)
            : localStorage.removeItem("refreshToken");
    }, [accessToken, refreshToken]);

    const login = async (credentials: { username: string; password: string }) => {
        const response = await loginAPI(credentials);

        if (response && response.status === 200) {
            const accessToken = response.headers["access"];
            const refreshToken = getCookie("refresh");

            setAccessToken(accessToken);
            console.log("Access Token:", accessToken);
            setRefreshToken(refreshToken);
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
                setRefreshToken(null);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            } else {
                console.error("Logout failed with status: " + response?.status);
            }
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
        return null;
    };

    const getRemainingTime = (): number | null => {
        if (!accessToken) return null;
        // @ts-ignore
        const decoded = jwtDecode<JwtPayload>(accessToken);
        const currentTime = Date.now() / 1000;
        const remainingTime = decoded.exp - currentTime;
        return remainingTime > 0 ? remainingTime : 0;
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout, getRemainingTime }}>
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