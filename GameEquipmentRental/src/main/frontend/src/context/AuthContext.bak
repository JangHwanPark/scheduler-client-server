import { createContext, useContext, useState, ReactNode, ChangeEvent } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface UserInput {
    [key: string]: any;
}

interface AuthContextType {
    userInput: UserInput;
    setUserInput: (input: UserInput) => void;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (endpoint: string, method?: 'get' | 'post', headers?: Record<string, string>, isLogin?: boolean) => Promise<void>;
    authToken: string | null;
}

const defaultAuthContext: AuthContextType = {
    userInput: {},
    setUserInput: () => {},
    handleChange: () => {},
    handleSubmit: async () => {},
    authToken: null
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [userInput, setUserInput] = useState<UserInput>({});
    const [authToken, setAuthToken] = useState<string | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserInput((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (
        endpoint: string,
        method: 'get' | 'post' = 'post',
        headers: Record<string, string> = {},
        isLogin: boolean = false
    ) => {
        try {
            let data: FormData | string;
            let config: AxiosRequestConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                }
            };
            //multipart/form-data
            if (headers['Content-Type'] === 'application/json') {
                const formData = new FormData();
                Object.keys(userInput).forEach(key => formData.append(key, userInput[key]));
                data = formData;
            } else {
                data = JSON.stringify(userInput);
            }

            const response = await (method === 'post' ? axios.post(endpoint, data, config) : axios.get(endpoint, { params: data, ...config }));
            const resjson = JSON.stringify(response);

            console.log('응답', response);
            console.log('응답 헤더:', response.headers);
            console.log('응답', resjson);

            if (isLogin && response.headers['access']) {
                const token = response.headers['access'];
                console.log('Authorization 토큰:', token); // 토큰 로깅
                setAuthToken(token);
                await handleTokenDecode(token);
            } else {
                console.log('로그인이 아니거나 토큰이 없습니다.', isLogin, response.headers['authorization']);
            }

            console.log('요청 성공:', JSON.stringify(response));
            alert('요청 성공: ' + JSON.stringify(response));
            setUserInput({});  // 성공 후 입력값 초기화
        } catch (error) {
            console.error('요청 실패:', error);
            alert('요청 실패: ' + error);
        }
    };


    const handleTokenDecode = async (token: string) => {
        console.log('토큰 복호화 시도:', token);
        try {
            const config: AxiosRequestConfig = {
                headers: {
                    'Authorization': `Bearer ${token}`
                    //'Content-Type': 'multipart/form-data'
                }
            };

            const response = await axios.post('http://localhost:8081/api1', null, config);
            console.log('토큰 복호화 성공: ' + JSON.stringify(response));
        } catch (error) {
            console.error('토큰 복호화 실패:', error);
            alert('토큰 복호화 실패: ' + error);
        }
    };

    return (
        <AuthContext.Provider value={{ userInput, setUserInput, handleChange, handleSubmit, authToken }}>
            {children}
        </AuthContext.Provider>
    );
};