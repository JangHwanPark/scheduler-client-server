import UserForm from "../common/UserForm.tsx";
import {Link} from "react-router-dom";
import FormContainer from "../layout/FormContainer.tsx";

interface UserInput {
    id: string;
    password: string;
    passwordConfirm: string;
    name: string;
    phone: string;
}

export default function Register() {
    // 입력값 상태
    const initialValues: UserInput = {
        id: "",
        password: "",
        passwordConfirm: "",
        name: "",
        phone: ""
    }

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    return (
        <FormContainer>
            <UserForm
                initialValues={initialValues}
                endpoint="http://localhost:8081/user/join"
                onSuccessMessage="회원가입이 완료되었습니다."
                onFailureMessage="회원가입에 실패했습니다."
                fields={["id", "password", "passwordConfirm", "name", "phone"]}
                submitButtonText="회원가입"
                headers={headers}
            />
            <Link to="/admin">어드민</Link>
            <Link to="/">로그인</Link>
        </FormContainer>
    );
}