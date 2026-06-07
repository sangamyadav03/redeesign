export const getApiErrorMessage = (error, fallback = 'Something went wrong.') => {
  if (!error?.response) {
    return 'Unable to reach the server. Make sure the backend is running.';
  }
  return error.response?.data?.message || fallback;
};
