import UserForm from "../common/UserForm.tsx";
import {Link} from "react-router-dom";
import FormContainer from "../layout/FormContainer.tsx";

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
        <FormContainer>
            <UserForm
                initialValues={initialValues}
                endpoint="http://localhost:8081/login"
                onSuccessMessage="로그인 성공."
                onFailureMessage="로그인에 실패했습니다."
                fields={["id", "password"]}
                submitButtonText="로그인"
            />
            <Link to="/register">회원가입</Link>
            <Link to="/admin">어드민</Link>
        </FormContainer>
    );
}