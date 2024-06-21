import {ChangeEvent, FormEvent, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {useMutation} from "@tanstack/react-query";

interface UserInput {
    id: string;
    password: string;
    passwordConfirm?: string;
    name?: string;
    phoneNumber?: string;
}

interface FormProps {
    initialValues: UserInput;
    endpoint: string;
    onSuccessMessage: string;
    onFailureMessage: string;
    fields: Array<keyof UserInput>;
}

export default function UserForm(
    {
        initialValues,
        endpoint,
        onSuccessMessage,
        onFailureMessage,
        fields,
    }: FormProps
) {
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
        },
        onError: (error: any) => {
            console.log(error);
            alert(onFailureMessage);
        }
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(userInput);
    }

    return (
        <form onSubmit={handleSubmit}>
            {fields.includes("id") && (
                <input
                    type="text"
                    name="id"
                    placeholder="아이디를 입력해 주세요"
                    onChange={handleChange}
                />
            )}
            {fields.includes("password") && (
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력하세요"
                    onChange={handleChange}
                />
            )}
            {fields.includes("passwordConfirm") && (
                <input
                    type="password"
                    name="passwordConfirm"
                    placeholder="비밀번호를 다시 입력해 주세요"
                    onChange={handleChange}
                />
            )}
            {fields.includes("name") && (
                <input
                    type="text"
                    name="name"
                    placeholder="이름을 입력해 주세요"
                    onChange={handleChange}
                />
            )}
            {fields.includes("phoneNumber") && (
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="전화번호를 입력해 주세요"
                    onChange={handleChange}
                />
            )}
            <button type="submit">제출</button>
        </form>
    );
}