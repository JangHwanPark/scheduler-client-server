import { createContext, ReactNode, useState } from "react";
import api from "../api/axiosInstance.ts";
import Cookies from "js-cookie";
import * as auth from "../api/auth.ts";
import {AxiosResponse} from "axios";


// 컨텍스트 API 타입 정의
export interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    userInfo: UserInfoType | null;
    roles: RoleType;
    isLogin: boolean;
    login: (username: string, password: string) => Promise<void>;
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

// 사용자 정보 타입 정의
interface UserInfo {
    id: string;
    role: string;
    no: number;
    userId: string;
    authList: { auth: string }[];
}

// Axios 응답 타입 정의
interface UserInfoResponse extends AxiosResponse {
    data: UserInfo;
}


// 컨텍스트 생성
export const AuthContext = createContext<AuthContextType | undefined>(undefined);


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


    /**
     * 벨리데이션 ( 로그인 체크 )
     * - 쿠키에 jwt 가 있는지 확인
     * - jwt 로 사용자 정보를 요청
     */
    const loginValidation = async () => {

        // 쿠키에서 jwt 가져오기
        const accessToken = Cookies.get("accessToken");
        console.log("accessToken:", accessToken);

        // accessToken이 없으면 로그인 상태가 아님
        if (!accessToken) {
            console.log("accessToken 없음");
            logout();
            return;
        }

        // 헤더에 jwt 설정 (header 에 jwt 담기)
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // 사용자 정보 요청
        const response: UserInfoResponse = await auth.getUserInfoApi()
        const data: UserInfo = response.data;
        console.log("data:", data);

        // 인증 성공 (로그인 설정)
        loginSetting(data, accessToken);
    }


    // 로그인 함수
    const login = async (username: string, password: string) => {
        console.log(`login username: ${username}`);
        console.log(`login password: ${password}`);

        const response = await auth.loginApi();
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
    const loginSetting = (
        userData: { no: number; userId: string; authList: { auth: string }[] },
        accessToken: string | undefined
    ) => {
        const { no, userId, authList } = userData;
        const roleList = authList.map((auth) => auth.auth);

        console.log(`no: ${no}`);
        console.log(`userId: ${userId}`);
        console.log(`authList: ${authList}`);
        console.log(`roleList: ${roleList}`);

        // 헤더 설정
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // 쿠키에 jwt 저장
        if (accessToken) Cookies.set("accessToken", accessToken);

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
        if (accessToken) {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
        }
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
        <AuthContext.Provider value={{
            isLogin,
            userInfo,
            roles,
            accessToken,
            refreshToken,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}