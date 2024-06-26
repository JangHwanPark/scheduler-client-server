import {useAuth} from "../../context/AuthContext.tsx";
import {Link} from "react-router-dom";

export const AdminHeader = () => {
    const { accessToken, refreshToken, isLogin, logout } = useAuth();

    return (
        <header className="admin-header">
            <p>Login Admin Info</p>
            {accessToken ? <p>Access Token: {accessToken}</p> : <p>Access Token: 로그인 ㄱㄱ</p>}
            {refreshToken ? <p>Refresh Token: {refreshToken}</p> : <p>Refresh Token: 로그인 ㄱㄱ</p>}
            {!isLogin
                ? (
                    <div>
                        <Link to="/login">로그인</Link>
                        <Link to="/register">회원가입</Link>
                    </div>
                )
                : (
                    <div>
                        <Link to="/admin">어드민</Link>
                        <button onClick={() => logout()}>로그아웃</button>
                    </div>
                )
            }
        </header>
    );
};