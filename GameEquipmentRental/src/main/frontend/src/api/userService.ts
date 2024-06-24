import axiosInstance from './axiosInstance';

interface UserInput {
    id: string;
    password: string;
    passwordConfirm?: string;
    name?: string;
    phoneNumber?: string;
}

export const registerUser = async (userData: UserInput) => {
    const response = await axiosInstance.post('/user/join', userData);
    return response.data;
};

export const loginUser = async (userData: UserInput) => {
    const response = await axiosInstance.post('/login', userData);
    return response.data;
};