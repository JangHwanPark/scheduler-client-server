import {ChangeEvent, FormEvent, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {useMutation} from "@tanstack/react-query";

// Icon
import {MdOutlineDriveFileRenameOutline, MdOutlineLock} from "react-icons/md";
import {FaRegUser} from "react-icons/fa";
import {FaPhoneFlip} from "react-icons/fa6";

// Service
import {validateUserInput} from '../../service';

// Type
import {UserInput} from "../../types";

interface FormProps {
    initialValues: UserInput;
    endpoint: string;
    onSuccessMessage: string;
    onFailureMessage: string;
    fields: Array<keyof UserInput>;
    submitButtonText?: string;
}

const iconMap: { [key in keyof UserInput]: JSX.Element } = {
    id: <FaRegUser />,
    password: <MdOutlineLock />,
    passwordConfirm: <MdOutlineLock />,
    name: <MdOutlineDriveFileRenameOutline />,
    phoneNumber: <FaPhoneFlip />
}

const placeholderMap: { [key in keyof UserInput]: string } = {
    id: "아이디를 입력해 주세요",
    password: "비밀번호를 입력하세요",
    passwordConfirm: "비밀번호를 다시 입력해 주세요",
    name: "이름을 입력해 주세요",
    phoneNumber: "전화번호를 입력해 주세요"
};

export default function UserForm(
    {
        initialValues,
        endpoint,
        onSuccessMessage,
        onFailureMessage,
        fields,
        submitButtonText
    }: FormProps
) {
    // 입력값 상태
    const [userInput, setUserInput] = useState<UserInput>(initialValues);

    // input 값 변경 시 상태 변경
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    // 회원가입 요청
    const mutation = useMutation({
        mutationFn: (newUser: UserInput) => {
            return axios.post(endpoint, newUser)
        },
        onSuccess: (response: AxiosResponse) => {
            console.log(response);
            alert(onSuccessMessage);

            // 로그인 성공 시 리다이렉트
            window.location.href = "/admin";
        },
        onError: (error: never) => {
            console.log(error);
            alert(onFailureMessage);
        }
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateUserInput(userInput);

        // 유효성 검사 통과시 회원가입 요청을 보냄
        mutation.mutate({
            id: userInput.id,
            password: userInput.password,
            passwordConfirm: userInput.passwordConfirm ?? '',
            name: userInput.name ?? '',
            phoneNumber: userInput.phoneNumber ?? ''
        });
    }

    return (
        <form onSubmit={handleSubmit} className="form login">
            {fields.map((field => (
                <div className="input-field">
                    <label htmlFor={`login-${field}`}>
                        {iconMap[field]}
                    </label>
                    <input
                        id={`login-${field}`}
                        type={field.includes("password") ? "password" : "text"}
                        name={field}
                        placeholder={placeholderMap[field]}
                        onChange={handleChange}
                        value={userInput[field] || ""}
                    />
                </div>
            )))}
            <button type="submit">
                {submitButtonText}
            </button>
        </form>
    );
}