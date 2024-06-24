import UserForm from "../common/UserForm.tsx";
import {Link} from "react-router-dom";
import FormContainer from "../layout/FormContainer.tsx";

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

    return (
        <FormContainer>
            <UserForm
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
        </FormContainer>
    );
}