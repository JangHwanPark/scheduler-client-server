// import axios from 'axios';
//
// const TOKEN_TYPE = localStorage.getItem("tokenType");
// let ACCESS_TOKEN = localStorage.getItem("accessToken");
//
// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8081',
//     timeout: 1000,
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`
//     }
// });
//
// /** LOGIN API */
// export const login = async ({ username, password }: never) => {
//     const data = { username, password };
//     const response = await axiosInstance.post(`/login`, data);
//     return response.data;
// }
//
// export default axiosInstance;