import {FormEvent, useState} from "react";
import {MdOutlineDriveFileRenameOutline, MdOutlineLock} from "react-icons/md";
import {FaRegUser} from "react-icons/fa";
import {FaPhoneFlip} from "react-icons/fa6";
import {validateUserInput} from '../../service';
import {FormProps, UserInput} from "../../types";
import {useAuth} from "../../context/AuthContext.tsx";
import axios from "axios";

const iconMap: { [key in keyof UserInput]: JSX.Element } = {
    id: <FaRegUser/>,
    username: <FaRegUser/>,
    password: <MdOutlineLock/>,
    passwordConfirm: <MdOutlineLock/>,
    name: <MdOutlineDriveFileRenameOutline/>,
    phone: <FaPhoneFlip/>
};

const placeholderMap: { [key in keyof UserInput]: string } = {
    id: "아이디를 입력해 주세요",
    username: "아이디를 입력해 주세요",
    password: "비밀번호를 입력하세요",
    passwordConfirm: "비밀번호를 다시 입력해 주세요",
    name: "이름을 입력해 주세요",
    phone: "전화번호를 입력해 주세요"
};

export default function AuthForm(
    {
        endpoint,
        fields,
        submitButtonText,
        headers,
        onSuccessMessage,
        onFailureMessage
    }: FormProps) {
    const {login} = useAuth();
    const [values, setValues] = useState<UserInput>({});
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        console.log("요청전 입력값:", values);
        const validationErrors = validateUserInput(values);
        if (Object.keys(validationErrors).length > 0) {
            setMessage(null);
            return;
        }

        setLoading(true);
        console.log("요청중 입력값:", values);

        try {
            const response = await axios.post(endpoint, values, {headers});
            if (response.status === 200) {
                setMessage(onSuccessMessage);
                if (endpoint.includes("login")) {
                    const loginValues = { username: values.username || "", password: values.password || "" };
                    await login(loginValues, password);
                }
                console.log("요청후 입력값:", values);
                console.log("응답메세지:", onSuccessMessage);
            } else {
                setMessage(onFailureMessage);
                console.log("응답메세지:", onFailureMessage);
            }
        } catch (error) {
            console.error('Request failed', error);
            setMessage(onFailureMessage);
            console.log("응답메세지:", onFailureMessage);
        } finally {
            setLoading(false);
        }
    };

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
                        autoComplete={field.includes("password") ? "new-password" : "off"}
                    />
                </div>
            )))}
            <button type="submit" disabled={loading}>
                {submitButtonText}
            </button>
            {message && <p>{message}</p>}
        </form>
    );
}