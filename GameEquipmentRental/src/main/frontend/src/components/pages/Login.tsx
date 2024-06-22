import UserForm from "../common/UserForm.tsx";
import {Link} from "react-router-dom";

interface UserInput {
    id: string;
    password: string;
}

export default function Login() {
    const initialValues: UserInput = {
        id: "",
        password: "",
    };

    // Todo: 컴포넌트 분리 필요
    return (
        <>
            <UserForm
                initialValues={initialValues}
                endpoint="http://localhost:8081/user/login"
                onSuccessMessage="로그인 성공."
                onFailureMessage="로그인에 실패했습니다."
                fields={["id", "password"]}
            />
            <Link to="/admin">어드민</Link>
            <Link to="/register">회원가입</Link>
            <Link to="http://localhost:8081/page/join">http://localhost:8081/page/join</Link>
        </>
    );
}