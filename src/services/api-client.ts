import axios, { CanceledError } from "axios";
import { refresh } from "./user-service";

export { CanceledError };
const apiClient = axios.create({
  //baseURL: 'https://10.10.248.100',
  baseURL: process.env.VITE_SERVER,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      //place your reentry code
      const originalRequest = error.config;
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        const parsedCurrentUser = JSON.parse(currentUser);
        const res = await refresh(parsedCurrentUser.refreshToken);
        localStorage.setItem('currentUser', JSON.stringify({...parsedCurrentUser, refreshToken: res.refreshToken, accessToken: res.accessToken}))
        originalRequest.headers["Authorization"] =
          `JWT ${res.accessToken}`;
        return apiClient(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
