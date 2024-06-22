import UserForm from "../common/UserForm.tsx";

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
        <UserForm
            initialValues={initialValues}
            endpoint="http://localhost:8081/user/login"
            onSuccessMessage="로그인 성공."
            onFailureMessage="로그인에 실패했습니다."
            fields={["id", "password"]}
        />
    );
}