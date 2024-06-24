import {createContext, useState, useEffect, ReactNode, useContext} from "react";

// 컨텍스트 API 타입 정의
interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (credentials: { username: string, password: string }) => Promise<void>;
    logout: () => void;
}

// 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 프로바이더 생성
export function AuthProvider ({ children }: { children: ReactNode }) {
    // accessToken, refreshToken 상태 저장
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));

    // accessToken, refreshToken 이 변경될 때 마다 로컬 스토리지에 저장
    useEffect(() => {
        accessToken
            ? localStorage.setItem('accessToken', accessToken)
            : localStorage.removeItem('accessToken');

        refreshToken
            ? localStorage.setItem('refreshToken', refreshToken)
            : localStorage.removeItem('refreshToken');
    }, [accessToken, refreshToken]);

    // 로그인 함수 : 서버에 로그인 요청을 보내고 성공시 토큰을 상태에 저장
    const login = async (credentials: { username: string, password: string }) => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        if (response.ok) {
            const data = await response.json();
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
        }
    };

    // 로그아웃 함수: 토큰을 상태에서 제거
    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
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
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};