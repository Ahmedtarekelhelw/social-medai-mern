import axios from "axios";
import store from "./store";
import { setLogout, setToken } from "./features/auth/authSlice";

const BASE_URL = "https://social-medai-mern-b696.vercel.app/";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((req) => {
  const { token } = JSON.parse(localStorage.getItem("persist:auth"));
  if (token && !req.headers["Authorization"]) {
    req.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  return req;
});

axiosInstance.interceptors.response.use(
  // return res incase of not found any problem with authorization
  (res) => res,
  async (err) => {
    const prevReq = err?.config;
    if (err.response.status === 403 && !err.response.data.refresh) {
      const res = await axiosInstance.get("refresh");
      store.dispatch(setToken({ token: res.data.accessToken }));
      prevReq.headers.Authorization = `Bearer ${res.data.accessToken}`;
      return axiosInstance(prevReq);
    } else if (
      (err.response.status === 403 && err.response.data.refresh) ||
      err.response.status === 401
    ) {
      await axiosInstance.get("auth/logout");
      store.dispatch(setLogout());
    }
    // This to return any error in catch if the status code not 403
    return Promise.reject(err);
  }
);

export default axiosInstance;
