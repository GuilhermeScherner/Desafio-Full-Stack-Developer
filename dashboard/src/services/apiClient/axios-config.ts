import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

axiosInstance.interceptors.request.use(async (config) => {
  return {
    ...config,
  };
});

axiosInstance.interceptors.response.use((response) => response.data);

export default axiosInstance;
