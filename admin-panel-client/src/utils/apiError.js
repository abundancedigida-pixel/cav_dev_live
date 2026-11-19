export const getErrorMessage = (err) =>
  err?.response?.data?.message ||
  (err?.request
    ? "Unable to reach the server. Please try again."
    : "Something went wrong. Please try again.");