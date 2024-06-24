import { createContext, ReactNode, useContext, useState } from "react";
import api from "../api/axiosInstance.ts";
import Cookies from "js-cookie";
import * as auth from "../api/auth.ts";
import {loginApi} from "../api/auth.ts";

// 컨텍스트 API 타입 정의
interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    isLogin: boolean;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
}

interface RoleType {
    isUser: boolean;
    isAdmin: boolean;
}

interface UserInfoType {
    no: number;
    userId: string;
    roleList: string[];
}

// 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 프로바이더 생성
 * - 로그인 여부
 * - 유저 정보
 * - 권한 정보
 * - 아이디 저장
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    // 로그인 여부, 로그아웃 함수
    const [isLogin, setIsLogin] = useState<boolean>(false);

    // 유저 정보
    const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

    // 권한 정보
    const [roles, setRoles] = useState<RoleType>({
        isUser: false,
        isAdmin: false,
    });

    // 아이디 저장
    //const [username, setUsername] = useState<string>("");

    // 액세스 토큰과 리프레시 토큰 상태 저장
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    console.log("isLogin:", isLogin)
    console.log("roles:", roles)
    console.log("userInfo:", userInfo)

    // 벨리데이션
    const loginValidation = () => {
        let response
        let data

        response = await auth.getUserInfoApi()
        data = response.data;

        loginSetting(data, accessToken);
    }

    // 로그인
    const login = async (username, password) => {
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);

        const response = await auth.loginApi(username, password);
        const data = response.data;
        const status = response.status;
        const headers = response.headers;
        const authroization = headers.authorization;
        const accessToken = authroization.replace("Bearer ", "");

        // 로그인 성공
        if (status === 200) {
            console.log("로그인 성공");
            console.log("data:", data);
            console.log("status:", status);
            console.log("headers:", headers);
            console.log("authroization:", authroization);
            console.log("accessToken:", accessToken);

            // 쿠키에 jwt 저장
            Cookies.set("accessToken", accessToken);

            // 로그인 설정
            loginSetting(data, accessToken);
        } else {
            console.log("로그인 실패");
        }
    }

    // 로그인 설정 함수 (accessToken = jwt)
    const loginSetting = (userData: { no: number; userId: string; authList: { auth: string }[] }, accessToken: string) => {
        const { no, userId, authList } = userData;
        const roleList = authList.map((auth) => auth.auth);

        console.log(`no: ${no}`);
        console.log(`userId: ${userId}`);
        console.log(`authList: ${authList}`);
        console.log(`roleList: ${roleList}`);

        // 헤더 설정
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // 로그인 상태 설정
        setIsLogin(true);

        // 유저 정보 설정
        const updatedUserInfo = { no, userId, roleList };
        setUserInfo(updatedUserInfo);

        // 권한정보 설정
        const updatedRoles: RoleType = {
            isUser: false,
            isAdmin: false,
        };

        roleList.forEach((role) => {
            if (role === "ROLE_USER") updatedRoles.isUser = true;
            if (role === "ROLE_ADMIN") updatedRoles.isAdmin = true;
        });
        setRoles(updatedRoles);

        // 토큰 설정
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
    };

    // 로그아웃 함수: 토큰을 상태에서 제거
    const logout = () => {
        // axios 헤더에서 토큰 제거
        api.defaults.headers.common.Authorization = undefined;

        // 쿠키에서 토큰 제거
        Cookies.remove("accessToken");

        // 로그인 상태 변경
        setIsLogin(false);

        // 유저 정보 초기화
        setUserInfo(null);

        // 권한 정보 초기화
        setRoles({
            isUser: false,
            isAdmin: false,
        });

        // 토큰 초기화
        setAccessToken(null);
        setRefreshToken(null);
    };

    // AuthContext.Provider로 자식 컴포넌트들에게 인증 상태와 메서드를 제공
    return (
        <AuthContext.Provider value={{ isLogin, accessToken, refreshToken, login: async () => {}, logout }}>
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