import axios from "axios";

const baseURL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8800/api/";

export const makeRequest = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Add a request interceptor
makeRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
makeRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized, logging out...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
