import UserForm from "../common/UserForm.tsx";
import {Link} from "react-router-dom";

interface UserInput {
    id: string;
    password: string;
    passwordConfirm: string;
    name: string;
    phoneNumber: string;
}

export default function Register() {
    // 입력값 상태
    const initialValues: UserInput = {
        id: "",
        password: "",
        passwordConfirm: "",
        name: "",
        phoneNumber: ""
    }

    // Todo: 컴포넌트 분리 필요
    return (
        <div className="container">
            <div className="form-container">
                <div className="form-auth-wrap">
                    <UserForm
                        initialValues={initialValues}
                        endpoint="http://localhost:8081/user/join"
                        onSuccessMessage="회원가입이 완료되었습니다."
                        onFailureMessage="회원가입에 실패했습니다."
                        fields={["id", "password", "passwordConfirm", "name", "phoneNumber"]}
                        title="회원가입"
                        formClassName="form-sign-up"
                    />
                </div>
            </div>

            <div className="panels-container">
                <div className="panel right-panel">
                    <div className="content">
                        <h3>이미 계정이 있으신가요?</h3>
                        <Link to="/page/login" id="sign-in-btn" className="submit-btn transparent">Sign In</Link>
                    </div>
                    <img src="../../../public/img/register.svg" className="image" alt=""/>
                </div>
            </div>
        </div>
    );
}