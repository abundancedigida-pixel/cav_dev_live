import api from "@/lib/apiClient";
import SummaryApi from "@/constants/SummaryApi";

// Backend envelope: { success, message, data }

export const login = async ({ email, password }) => {
  const { url, method } = SummaryApi.login;
  const res = await api({ url, method, data: { email, password } });
  return res.data.data; // { token, user }
};

export const getProfile = async () => {
  const { url, method } = SummaryApi.getProfile;
  const res = await api({ url, method });
  return res.data.data;
};

export const forgotPassword = async ({ email }) => {
  const { url, method } = SummaryApi.forgotPassword;
  const res = await api({ url, method, data: { email } });
  return res.data;
};

export const verifyOtp = async ({ email, otp }) => {
  const { url, method } = SummaryApi.verifyOtp;
  const res = await api({ url, method, data: { email, otp } });
  return res.data.data; // { email, resetToken }
};

export const resetPassword = async ({ resetToken, password, confirmPassword }) => {
  const { url, method } = SummaryApi.resetPassword;
  const res = await api({
    url,
    method,
    data: { resetToken, password, confirmPassword },
  });
  return res.data;
};

/* ---------- session (localStorage) ---------- */
export const saveSession = ({ token, user }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isLoggedIn = () =>
  typeof window !== "undefined" && !!localStorage.getItem("token");