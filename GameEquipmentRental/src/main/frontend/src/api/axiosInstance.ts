import axios from 'axios';

const TOKEN_TYPE = 'Bearer';
let ACCESS_TOKEN = localStorage.getItem("accessToken");



// Axios 인스턴스 생성
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081', // 기본 URL 설정
    headers: {
        'Content-Type': 'application/json', // 기본 헤더 설정
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}` // 초기 Authorization 헤더 설정
    },
    withCredentials: true // 자격 증명 포함 설정
});



// 요청 인터셉터: 각 요청 전에 액세스 토큰을 최신 값으로 설정
axiosInstance.interceptors.request.use(
    async (config) => {
        ACCESS_TOKEN = localStorage.getItem("accessToken"); // 항상 최신 토큰을 가져옴
        if (ACCESS_TOKEN) {
            config.headers["Authorization"] = `${TOKEN_TYPE} ${ACCESS_TOKEN}`; // Authorization 헤더 설정
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // 요청 오류 처리
    }
);



// 응답 인터셉터: 401 오류가 발생하면 토큰을 재발급 받고 원래 요청을 재시도
axiosInstance.interceptors.response.use(
    (response) => {
        return response; // 정상 응답 처리
    },
    async (error) => {
        const originalRequest = error.config;
        const errorCode = error.response ? error.response.status : null;

        if (errorCode === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 재시도 플래그 설정

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                console.log("Refresh token:", refreshToken);

                const response = await axios.post(
                    'http://localhost:8081/reissue',
                    { refreshToken },
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true
                    }
                );

                if (response.status === 200) {
                    const newAccessToken = response.data.accessToken;
                    const newRefreshToken = response.data.refreshToken;

                    // 새로운 토큰을 로컬 스토리지에 저장
                    localStorage.setItem("accessToken", newAccessToken);
                    localStorage.setItem("refreshToken", newRefreshToken);

                    // Axios 인스턴스 및 원래 요청의 Authorization 헤더를 업데이트
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    // 원래 요청을 재시도
                    return axiosInstance(originalRequest);
                }
            } catch (err) {
                console.error("Refresh token error", err);

                // 리프레시 토큰이 유효하지 않은 경우 로그아웃 처리
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                // window.location.href = '/login'; // 로그인 페이지로 리디렉션
                return Promise.reject(error);
            }
        }

        return Promise.reject(error); // 응답 오류 처리
    }
);