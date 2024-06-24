import AuthForm from "../common/AuthForm.tsx";
import {Link} from "react-router-dom";
import FormContainer from "../layout/FormContainer.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import {useState} from "react";

interface UserInput {
    username: string;
    password: string;
}

export default function Login() {
    const initialValues: UserInput = {
        username: "",
        password: "",
    };

    const headers = {
        'Content-Type': 'multipart/form-data'
    }

    const { login } = useAuth();
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

    return (
        <FormContainer>
            <AuthForm
                initialValues={initialValues}
                endpoint="http://localhost:8081/login"
                onSuccessMessage="로그인 성공."
                onFailureMessage="로그인에 실패했습니다."
                fields={["username", "password"]}
                submitButtonText="로그인"
                headers={headers}
            />
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
            </form>
        </FormContainer>
    );
}