import AuthForm from "../common/AuthForm.tsx";
import FormContainer from "../layout/FormContainer.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import {FormEvent, useState} from "react";
import {AdminHeader} from "../common/AdminHeader.tsx";

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
        //'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/json',
    }


    const {login} = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const onLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        /**
         * TS2339: Property username does not exist on type EventTarget
         * 이벤트 핸들러의 target 속성 사용시 발생
         * target 기본 타입 = EventTarget 이며 username 을 포함하지 않음
         *
         * 문제 해결 방법
         * - 이벤트 타입 명확하게 지정
         * - target 을 적절하게 타입 캐스팅 해야함
         */
        const form = e.target as HTMLFormElement;
        const username = form.username.value;
        const password = form.password.value;
        /**
         * const username = (form.elements.namedItem("username") as HTMLInputElement).value;
         * const password = (form.elements.namedItem("password") as HTMLInputElement).value;
         */

        console.log("username:", username);
        console.log("password:", password);
        login(username, password)
    }


    /*const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await login({ username, password });
            alert("로그인 성공!");
        } catch (error) {
            console.error("로그인 실패", error);
            alert("로그인 실패");
        }
    };*/


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

            <div>Form Test</div>
            <form onSubmit={(e) => onLogin(e)}>
                <div>
                    <label>
                        아이디:
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        비번:
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">로그인</button>
            </form>
            <div>로그인 헤더 (테스트용)</div>
            <AdminHeader/>
        </FormContainer>
    );
}