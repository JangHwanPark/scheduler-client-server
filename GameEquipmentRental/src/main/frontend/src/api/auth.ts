import api from './axiosInstance';


// 로그인
export const loginApi = () => {
    return api.post(`http://localhost:8081/login`);
}


// 회원가입
export const registerApi = (data: never) => api.post(`/users`, data)


// 사용자 정보
export const getUserInfoApi = () => api.get(`/users/info`)


// 회원정보 수정
export const updateUserApi = (userId: number, data: never) => api.put(`/users/${userId}`, data)


// 회원탈퇴
export const removeUserApi = (userId: number) => api.delete(`/users/${userId}`)