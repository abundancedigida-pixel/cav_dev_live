
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // No login system, so no token removal or redirect.
    return Promise.reject(error);
  }
);

export default api;