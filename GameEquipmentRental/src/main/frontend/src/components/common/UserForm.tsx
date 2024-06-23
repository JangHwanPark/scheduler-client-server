import {ChangeEvent, FormEvent, useState} from "react";
import axios, {AxiosError, AxiosResponse} from "axios";
import {useMutation} from "@tanstack/react-query";

// Icon
import {MdOutlineDriveFileRenameOutline, MdOutlineLock} from "react-icons/md";
import {FaRegUser} from "react-icons/fa";
import {FaPhoneFlip} from "react-icons/fa6";

// Service
import {validateUserInput} from '../../service';

// Type
import {UserInput} from "../../types";

interface FormProps<T> {
    initialValues: T;
    endpoint: string;
    onSuccessMessage: string;
    onFailureMessage: string;
    fields: Array<keyof T>;
    submitButtonText?: string;
    headers: { [key: string]: string };
}

const iconMap: { [key in keyof UserInput]: JSX.Element } = {
    id: <FaRegUser />,
    password: <MdOutlineLock />,
    passwordConfirm: <MdOutlineLock />,
    name: <MdOutlineDriveFileRenameOutline />,
    phone: <FaPhoneFlip />
}

const placeholderMap: { [key in keyof UserInput]: string } = {
    id: "아이디를 입력해 주세요",
    password: "비밀번호를 입력하세요",
    passwordConfirm: "비밀번호를 다시 입력해 주세요",
    name: "이름을 입력해 주세요",
    phone: "전화번호를 입력해 주세요"
};

// Todo: 로그인로직 타입에러 복구
export default function UserForm<T>(
    {
        initialValues,
        endpoint,
        onSuccessMessage,
        onFailureMessage,
        fields,
        submitButtonText,
        headers
    }: FormProps<T>
) {
    // 입력값 상태
    const [userInput, setUserInput] = useState<T>(initialValues);

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
            console.log("요청 데이터:", newUser); // 요청 데이터 확인 로그
            let data;
            let config = {};

            if (headers && headers['Content-Type'] === 'multipart/form-data') {
                // FormData 객체 생성 및 데이터 추가
                data = new FormData();
                for (const key in newUser) {
                    data.append(key, (newUser as never)[key]);
                }
                console.log("if" + data)
                config = {
                    headers: headers
                };
            } else {
                // JSON 형식으로 데이터 전송
                console.log("else" + data)
                data = newUser;

                config = {
                    headers: headers || {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                };
            }

            return axios.post(endpoint, data, config);
        },
        onSuccess: (response: AxiosResponse) => {
            console.log(`${submitButtonText} 요청 성공:, ${response}`);
            alert(onSuccessMessage);

            // 요청 성공 시 리다이렉트
            // window.location.href = "/admin";
        },
        onError: (error: AxiosError) => {
            console.error(`${submitButtonText} 요청 실패:, ${error}`);
            if (error.response) {
                console.error("응답 데이터:", error.response.data);
                console.error("응답 상태 코드:", error.response.status);
                console.error("응답 헤더:", error.response.headers);
            } else if (error.request) {
                console.error("요청이 전송되었으나 응답을 받지 못함:", error.request);
            } else {
                console.error("요청 설정 중 에러 발생:", error.message);
            }
            alert(onFailureMessage);
        }
    });


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`${submitButtonText} 요청 전: ${JSON.stringify(userInput)}`);
        validateUserInput(userInput as never);
        mutation.mutate(userInput as never);
        console.log(`${submitButtonText} 요청 중: ${JSON.stringify(userInput)}`);
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
                        value={(userInput as never)[field] || ""}
                    />
                </div>
            )))}
            <button type="submit">
                {submitButtonText}
            </button>
        </form>
    );
}