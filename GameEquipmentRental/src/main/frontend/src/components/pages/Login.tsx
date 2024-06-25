// import AuthForm from "../common/AuthForm.tsx";
import {Link} from "react-router-dom";
import FormContainer from "../layout/FormContainer.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import {useState} from "react";
import TokenTimer from "../common/TokenTimer.tsx";
import {getUserInfo} from "../../api/userService.ts";

/*interface UserInput {
    username: string;
    password: string;
}*/

// 사용자 정보 타입 정의
interface UserInfo {
    id: string;
    role: string;
}

export default function Login() {
    const { login, logout } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await login({ username, password });
            alert("로그인 성공!");
        } catch (error) {
            console.error("로그인 실패", error);
            alert("로그인 실패");
        }
    };

    const handleLogout = async () => {
        logout();
        console.log("로그아웃")
    }

    /* 액세스 토큰 갱신을 위한 테스트 로직 */
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const fetchUserInfo = async () => {
        const response = await getUserInfo();
        if (response && response.status === 200) {
            setUserInfo(response.data);
        } else {
            console.error("사용자 정보 가져오기 실패");
        }
    };

    return (
        <FormContainer>
            <Link to="/register">회원가입</Link>
            <Link to="/admin">어드민</Link>
            <div>Form Test</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        아이디:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        비번:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">로그인</button>
                <TokenTimer/>
                <div></div>
            </form>
            <button type="submit" onClick={handleLogout}>로그아웃</button>
            <div>
                <button onClick={fetchUserInfo}>사용자 정보 가져오기</button>
                {userInfo ? (
                    <div>
                        <h3>사용자 정보:</h3>
                        <p>이름: {userInfo.id}</p>
                        <p>권한: {userInfo.role}</p>
                        {/*<p>권한: {userInfo.role}</p>*/}
                    </div>
                ) : (
                    <p>로그인 ㄱㄱ.</p>
                )}
            </div>
        </FormContainer>
    );
}