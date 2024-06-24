import {FormEvent, useEffect, useState} from "react";
import {login} from "../../api/axiosInstance.ts";

// Icon
import {MdOutlineDriveFileRenameOutline, MdOutlineLock} from "react-icons/md";
import {FaRegUser} from "react-icons/fa";
import {FaPhoneFlip} from "react-icons/fa6";

// Service
//import {validateUserInput} from '../../service';

// Type
import {UserInput, FormProps} from "../../types";
//import {useAuth} from "../../context/AuthContext.tsx";

const iconMap: { [key in keyof UserInput]: JSX.Element } = {
    id: <FaRegUser />,
    username: <FaRegUser />,
    password: <MdOutlineLock />,
    passwordConfirm: <MdOutlineLock />,
    name: <MdOutlineDriveFileRenameOutline />,
    phone: <FaPhoneFlip />
} as { [key: string]: JSX.Element };

const placeholderMap: { [key in keyof UserInput]: string } = {
    id: "아이디를 입력해 주세요",
    username: "아이디를 입력해 주세요",
    password: "비밀번호를 입력하세요",
    passwordConfirm: "비밀번호를 다시 입력해 주세요",
    name: "이름을 입력해 주세요",
    phone: "전화번호를 입력해 주세요"
} as { [key: string]: string };

export default function UserForm(
    {
        //endpoint,
        fields,
        submitButtonText,
        //headers
    }: FormProps
) {
    /*const { userInput, handleChange, handleSubmit } = useAuth();

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        // 입력 검증
        validateUserInput(userInput);

        // 요청 처리
        await handleSubmit(endpoint, 'post', headers, true);
    };*/
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const handleChange = async (e) => {
        const field = e.target.id.replace("login-", "");
        console.log(e.target.value)
        console.log('values' + JSON.stringify(values))
        setValues({
            ...values,
            [field]: e.target.value
        });
    }

    useEffect(() => {
        console.log('Current values:', values);
    }, [values]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(values)
            .then((response) => {
                localStorage.clear();
                localStorage.setItem('tokenType', response.tokenType);
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);
                //window.location.href = `/admin`;
            }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <form onSubmit={handleSubmit} className="form login">
            {fields.map((field => (
                <div className="input-field" key={field}>
                    <label htmlFor={`login-${field}`}>
                        {iconMap[field]}
                    </label>
                    <input
                        id={`login-${field}`}
                        type={field.includes("password") ? "password" : "text"}
                        name={field}
                        placeholder={placeholderMap[field]}
                        onChange={handleChange}
                        value={values[field] || ""}
                    />
                </div>
            )))}
            <button type="submit">
                {submitButtonText}
            </button>
        </form>
    );
}