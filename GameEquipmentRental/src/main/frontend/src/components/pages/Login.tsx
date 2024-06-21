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
        <div className="container">
            <div className="form-container">
                <div className="form-auth-wrap">
                    <UserForm
                        initialValues={initialValues}
                        endpoint="http://localhost:8081/page/login"
                        onSuccessMessage="로그인 성공."
                        onFailureMessage="로그인에 실패했습니다."
                        fields={["id", "password"]}
                        title="로그인"
                        formClassName="form-sign-in"
                    />
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>계정이 없으신가요?</h3>
                        <Link to="/register" id="sign-up-btn" className="submit-btn transparent">회원가입</Link>
                        {/*<Link to="http://localhost:8081/page/join">http://localhost:8081/page/join</Link>*/}
                    </div>
                    <img src="/img/log.svg" className="image" alt=""/>
                </div>
            </div>
        </div>
    );
}