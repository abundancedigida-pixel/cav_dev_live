import api from "@/lib/apiClient";
import SummaryApi from "@/constants/SummaryApi";

// Backend envelope: { success, message, data }

export const getMyProfile = async () => {
  const { url, method } = SummaryApi.getProfile;
  const res = await api({ url, method });
  return res.data.data; // { username, email, role, isActive, lastLogin }
};

export const sendPasswordOtp = async (email) => {
  const { url, method } = SummaryApi.forgotPassword;
  const res = await api({ url, method, data: { email } });
  return res.data;
};

// returns the temporary reset token
export const verifyPasswordOtp = async (email, otp) => {
  const { url, method } = SummaryApi.verifyOtp;
  const res = await api({ url, method, data: { email, otp } });
  return res.data.data.resetToken;
};

export const setNewPassword = async ({ resetToken, password, confirmPassword }) => {
  const { url, method } = SummaryApi.resetPassword;
  const res = await api({ url, method, data: { resetToken, password, confirmPassword } });
  return res.data;
};