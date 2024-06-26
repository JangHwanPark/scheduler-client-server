import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import FormContainer from "../layout/FormContainer.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import TokenTimer from "../common/TokenTimer.tsx";
import InputField from "../common/InputField.tsx";
import {FaRegUser} from "react-icons/fa";
import {MdOutlineLock} from "react-icons/md";
import {UserInput} from "../../types";
import PrimaryButton from "../common/PrimaryButton.tsx";
import {validateUserInput} from "../../service";


export default function Login() {
    const navigate = useNavigate();

    // Context API 사용
    const {login, userInfo} = useAuth();

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
        const {name, value} = e.target;
        setValues({...values, [name]: value,});
        console.log("handleChange values:", {[name]: value});
    };


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            validateUserInput(values);
            await login({
                username: values.username || "",
                password: values.password || ""
            });
        } catch (error) {
            console.error("로그인 실패", error);
            alert("로그인 실패");
        }
    };


    return (
        <div className="login-container">
            <h1>Spring Security x JWT x React</h1>
            <FormContainer>
                <main className="main-contents">
                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="form-login login">
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
                        <PrimaryButton
                            title="로그인"
                            type="submit"
                        />
                    </form>

                    {/* Remember me */}
                    <div>
                        <label htmlFor="">
                            <input type="checkbox"/>
                            비밀번호 저장하기
                        </label>
                    </div>

                    {/* divider */}
                    <span className="divider">
                        <span>OR</span>
                    </span>

                    {/* Social Login */}
                    <button onClick={() => alert("준비중 입니다.")}>Login</button>

                    {/* Register */}
                    <div style={{width: "100%", display: "flex", justifyContent: "space-around"}}>
                        <small><Link to="/register">회원가입</Link></small>
                        <TokenTimer/>
                    </div>
                </main>
            </FormContainer>
        </div>
    );
}