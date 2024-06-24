import {useAuth} from "../../context/AuthContext.tsx";

export const AdminHeader = () => {
    const { accessToken, refreshToken } = useAuth();

    return (
        <header className="admin-header">
            <p>Login Admin Info</p>
            {accessToken ? <p>Access Token: {accessToken}</p> : <p>Access Token: 로그인 ㄱㄱ</p>}
            {refreshToken ? <p>Refresh Token: {refreshToken}</p> : <p>Refresh Token: 로그인 ㄱㄱ</p>}
        </header>
    );
};