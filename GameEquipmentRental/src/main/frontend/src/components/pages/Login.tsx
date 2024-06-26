import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import FormContainer from "../layout/FormContainer.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import TokenTimer from "../common/TokenTimer.tsx";
import InputField from "../common/InputField.tsx";
import {FaRegUser} from "react-icons/fa";
import {MdOutlineLock} from "react-icons/md";
import {UserInput} from "../../types";


export default function Login() {
    const navigate = useNavigate();

    // Context API 사용
    const {login, logout, userInfo} = useAuth();

    // 객체를 사용한 사용자 입력 관리
    const [values, setValues] = useState<UserInput>({
        username: "",
        password: ""
    });


    useEffect(() => {
        if (userInfo) {
            if (userInfo.role === "ROLE_ADMIN") {
                alert("로그인 성공!");
                navigate("/admin");
            } else if (userInfo.role === "ROLE_USER") {
                alert("로그인 성공!");
                navigate("/customer");
            }
        }
    }, [userInfo, navigate]);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values, [name]: value,
        });
        console.log("handleChange values:", { [name]: value });
    };


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await login({
                username: values.username || "",
                password: values.password || ""
            });
        } catch (error) {
            console.error("로그인 실패", error);
            alert("로그인 실패");
        }
    };


    const handleLogout = async () => {
        logout();
        console.log("로그아웃")
    };


    return (
        <FormContainer>
            <form onSubmit={handleSubmit} className="form login">
                <InputField
                    type="text"
                    name="username"
                    icon={<FaRegUser/>}
                    value={values.username || ""}
                    onChange={handleChange}
                    placeholder="아이디를 입력하세요."
                />
                <InputField
                    type="text"
                    name="password"
                    icon={<MdOutlineLock/>}
                    value={values.password || ""}
                    onChange={handleChange}
                    placeholder="비밀번호를 입력하세요."
                />
                <button type="submit">
                    로그인
                </button>
                <TokenTimer/>
            </form>
            <Link to="/register">
                회원가입
            </Link>
            <button type="submit" onClick={handleLogout}>
                로그아웃
            </button>
        </FormContainer>
    );
}