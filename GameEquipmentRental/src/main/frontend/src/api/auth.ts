import api from './axiosInstance';

// 로그인
export const loginApi = (username: string, password: string) => {
    return api.post(`http://localhost:8081/login?=username=${username}&password=${password}`);
}

/*export const loginApi = async (credentials: {
    username: string; password: string
}): Promise<{ accessToken: string; refreshToken: string } | null> => {
    try {
        const response = await api.post(
            "http://localhost:8081/login",
            credentials
        );
        api.defaults.headers.common.Authorization = `Bearer ${response.headers["access"]}`;

        if (response.status === 200) {
            console.log("Res:", response);
            console.log("Res headers:", response.headers);

            const accessToken = response.headers["access"];
            const refreshToken = response.headers["refresh"];

            console.log("Access Token:", accessToken);
            console.log("Refresh Token:", refreshToken);

            if (accessToken && refreshToken) {
                return { accessToken, refreshToken };
            }
        } else {
            console.error("Login failed with status: " + response.status);
        }
    } catch (error) {
        console.error("Login error", error);
    }
    return null;
};*/

// 회원가입
export const registerApi = (data: never) => api.post(`/users`, data)

// 사용자 정보
export const getUserInfoApi = () => api.get(`/users/info`)

// 회원정보 수정
export const updateUserApi = (userId: number, data: never) => api.put(`/users/${userId}`, data)

// 회원탈퇴
export const removeUserApi = (userId: number) => api.delete(`/users/${userId}`)