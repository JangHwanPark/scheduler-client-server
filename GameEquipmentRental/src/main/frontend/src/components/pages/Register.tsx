import UserForm from "../common/UserForm.tsx";

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
        <div>
            <UserForm
                initialValues={initialValues}
                endpoint="http://localhost:8081/page/join"
                onSuccessMessage="회원가입이 완료되었습니다."
                onFailureMessage="회원가입에 실패했습니다."
                fields={["id", "password", "passwordConfirm", "name", "phoneNumber"]}
            />
        </div>
    );
}