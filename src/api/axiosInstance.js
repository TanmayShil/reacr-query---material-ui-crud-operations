// import axios from "axios";

// const baseUrlApi = import.meta.env.VITE_API_BASE_URL;

// const axiosInstance = axios.create({
//   baseURL: baseUrlApi
// });


// export default axiosInstance;

// src/api/axiosInstance.js

import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrlApi = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseUrlApi,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // config.headers.Authorization = "";
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
