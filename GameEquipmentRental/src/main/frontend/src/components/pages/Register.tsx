import {useState} from "react";
import {Link} from "react-router-dom";
import FormContainer from "../layout/FormContainer.tsx";
import {FaRegUser} from "react-icons/fa";
import {MdOutlineDriveFileRenameOutline, MdOutlineLock} from "react-icons/md";
import {FaPhoneFlip} from "react-icons/fa6";
import InputField from "../common/InputField.tsx";
import {registerAPI} from "../../api/userService.ts";

// 사용자 입력 타입 정의
interface UserInputTypes {
    id: string;
    password: string;
    passwordConfirm: string;
    name: string;
    phone: string;
}

const iconMap: { [key in keyof UserInputTypes]: JSX.Element } = {
    id: <FaRegUser/>,
    password: <MdOutlineLock/>,
    passwordConfirm: <MdOutlineLock/>,
    name: <MdOutlineDriveFileRenameOutline/>,
    phone: <FaPhoneFlip/>
};

const placeholderMap: { [key in keyof UserInputTypes]: string } = {
    id: "아이디를 입력해 주세요",
    password: "비밀번호를 입력하세요",
    passwordConfirm: "비밀번호를 다시 입력해 주세요",
    name: "이름을 입력해 주세요",
    phone: "전화번호를 입력해 주세요"
};


export default function Register() {
    // Context API 사용

    // 입력값 상태
    const [values, setValues] = useState<UserInputTypes>({
        id: "",
        password: "",
        passwordConfirm: "",
        name: "",
        phone: ""
    });


    const handleChange = (e: {
        target: { name: any; value: any; };
    }) => {
        console.log("handleChange")
        const {name, value} = e.target;
        setValues({
            ...values, [name]: value,
        });
    }

    const handleSubmit = async (e: {
        preventDefault: () => void;
    }) => {
        e.preventDefault();
        console.log("요청전 입력값:", values);
        try {
            await registerAPI(values);
            alert("회원가입이 완료되었습니다.");
        } catch (error) {
            alert("회원가입에 실패했습니다.");
        }
    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit} className="form login">
                <InputField
                    icon={iconMap.id}
                    type="text"
                    name="id"
                    placeholder={placeholderMap.id}
                    onChange={handleChange}
                    value={values.id || ""}
                />
                <InputField
                    icon={iconMap.password}
                    type="password"
                    name="password"
                    placeholder={placeholderMap.password}
                    onChange={handleChange}
                    value={values.password || ""}
                />
                <InputField
                    icon={iconMap.passwordConfirm}
                    type="password"
                    name="passwordConfirm"
                    placeholder={placeholderMap.passwordConfirm}
                    onChange={handleChange}
                    value={values.passwordConfirm || ""}
                />
                <InputField
                    icon={iconMap.name}
                    type="text"
                    name="name"
                    placeholder={placeholderMap.name}
                    onChange={handleChange}
                    value={values.name || ""}
                />
                <InputField
                    icon={iconMap.phone}
                    type="text"
                    name="phone"
                    placeholder={placeholderMap.phone}
                    onChange={handleChange}
                    value={values.phone || ""}
                />
                <button>
                    회원가입
                </button>
            </form>
            <Link to="/">로그인</Link>
        </FormContainer>
    );
}