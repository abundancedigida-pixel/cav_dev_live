import axios from "axios";

// Backend URL .env la irundhu varum. SummaryApi la path mattum irukku.
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (typeof window === "undefined") return Promise.reject(error);

    const status = error?.response?.status;
    const isLoginAttempt = (error?.config?.url || "").includes("/auth/login");
    const onLoginPage = window.location.pathname.startsWith("/login");

    if (status === 401 && !isLoginAttempt && !onLoginPage) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // eslint-disable-next-line
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;