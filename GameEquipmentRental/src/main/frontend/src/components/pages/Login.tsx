// import AuthForm from "../common/AuthForm.tsx";
import {Link} from "react-router-dom";
import FormContainer from "../layout/FormContainer.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import TokenTimer from "../common/TokenTimer.tsx";
import InputField from "../common/InputField.tsx";
import {FaRegUser} from "react-icons/fa";
import {MdOutlineLock} from "react-icons/md";
import {UserInput} from "../../types";


export default function Login() {
    const {login, logout, fetchUserInfo, userInfo} = useAuth();
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const [values, setValues] = useState<UserInput>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
        console.log("values:", values);
    };


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await login({
                username: values.username || "",
                password: values.password || ""
            });
            alert("로그인 성공!");
        } catch (error) {
            console.error("로그인 실패", error);
            alert("로그인 실패");
        }
    };


    const handleLogout = async () => {
        logout();
        console.log("로그아웃")
    };


    const handleFetchUserInfo = async () => {
        await fetchUserInfo();
        console.log("사용자 정보 가져오기");
    }


    return (
        <FormContainer>
            <form onSubmit={handleSubmit} className="form login">
                <InputField
                    type="text"
                    name="username"
                    icon={<FaRegUser/>}
                    value={values.username || ""}
                    handleChange={handleChange}
                    placeholder="아이디를 입력하세요."
                />
                <InputField
                    type="text"
                    name="password"
                    icon={<MdOutlineLock/>}
                    value={values.password || ""}
                    handleChange={handleChange}
                    placeholder="비밀번호를 입력하세요."
                />
                <button type="submit">로그인</button>
                <TokenTimer/>
                <div></div>
            </form>
            {userInfo?.role === "ROLE_ADMIN" && (<Link to="/admin">어드민</Link>)}
            <Link to="/register">회원가입</Link>
            <button type="submit" onClick={handleLogout}>로그아웃</button>
            <div>
                <button onClick={handleFetchUserInfo}>사용자 정보 가져오기</button>
                {userInfo ? (
                    <div>
                        <h3>사용자 정보:</h3>
                        <p>이름: {userInfo.id}</p>
                        <p>권한: {userInfo.role}</p>
                    </div>
                ) : (
                    <p>로그인 ㄱㄱ.</p>
                )}
            </div>
        </FormContainer>
    );
}