import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import {getUserInfo, loginAPI, logoutAPI} from "../api/userService.ts";
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
    fetchUserInfo: () => Promise<void>;
    userInfo: UserInfo | null;
}

// 사용자 정보 타입 지정
interface UserInfo {
    user_name?: string;
    id?: string;
    role: string;
}


// 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);



// 프로바이더 생성
export function AuthProvider({ children }: { children: ReactNode }) {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
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


    // 로그인
    const login = async (credentials: { username: string; password: string }) => {
        const response = await loginAPI(credentials);
        if (response && response.status === 200) {
            // 토큰 저장 및 출력
            const accessToken = response.headers["access"];
            setAccessToken(accessToken);
            console.log("Access Token:", accessToken);
            await fetchUserInfo();
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
                setAccessToken(newAccessToken);
                localStorage.setItem("accessToken", newAccessToken);
            }
        }
    }


    // 사용자 정보 가져오기
    const fetchUserInfo = async () => {
        const response = await getUserInfo();
        response && response.status === 200
            ? setUserInfo(response.data)
            : console.error("사용자 정보 가져오기 실패");
    };


    const getRemainingTime = (): number | null => {
        if (!accessToken) return null;
        const decoded = jwtDecode<JwtPayload>(accessToken);
        const currentTime = Date.now() / 1000;
        const remainingTime = decoded.exp - currentTime;
        return remainingTime > 0 ? remainingTime : 0;
    };


    return (
        <AuthContext.Provider value={{
            accessToken,
            login,
            logout,
            checkLogin,
            getRemainingTime,
            fetchUserInfo,
            userInfo
        }}>
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