import {ChangeEvent, FormEvent, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {useMutation} from "@tanstack/react-query";

// Service
import {validateUserInput} from '../../service';

// Type
import {UserInput} from "../../types";
import {FaRegUser} from "react-icons/fa";
import {MdOutlineDriveFileRenameOutline, MdOutlineLock} from "react-icons/md";
import {FaPhoneFlip} from "react-icons/fa6";

interface FormProps {
    initialValues: UserInput;
    endpoint: string;
    onSuccessMessage: string;
    onFailureMessage: string;
    fields: Array<keyof UserInput>;
    submitButtonText?: string;
}

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
            {fields.includes("id") && (
                <div className="input-field">
                    <label htmlFor="login-userid">
                        <FaRegUser />
                    </label>
                    <input
                        id="login-userid"
                        type="text"
                        name="id"
                        placeholder="아이디를 입력해 주세요"
                        onChange={handleChange}
                        value={userInput.id}
                    />
                </div>
            )}
            {fields.includes("password") && (
                <div className="input-field">
                    <label htmlFor="login-password">
                        <MdOutlineLock />
                    </label>
                    <input
                        id="login-password"
                        type="password"
                        name="password"
                        placeholder="비밀번호를 입력하세요"
                        onChange={handleChange}s
                        value={userInput.password}
                    />
                </div>
            )}
            {fields.includes("passwordConfirm") && (
                <div className="input-field">
                    <label htmlFor="login-password">
                        <MdOutlineLock/>
                    </label>
                    <input
                        type="password"
                        name="passwordConfirm"
                        placeholder="비밀번호를 다시 입력해 주세요"
                        onChange={handleChange}
                        value={userInput.passwordConfirm}
                    />
                </div>
            )}
            {fields.includes("name") && (
                <div className="input-field">
                    <label htmlFor="login-password">
                        <MdOutlineDriveFileRenameOutline />
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="이름을 입력해 주세요"
                        onChange={handleChange}
                        value={userInput.name}
                    />
                </div>
            )}
            {fields.includes("phoneNumber") && (
                <div className="input-field">
                    <label htmlFor="login-password">
                        <FaPhoneFlip />
                    </label>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="전화번호를 입력해 주세요"
                        onChange={handleChange}
                        value={userInput.phoneNumber}
                    />
                </div>
            )}
            <button type="submit">
                {submitButtonText}
            </button>
        </form>
    );
}