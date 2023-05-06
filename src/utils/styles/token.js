export const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) return token;
  return null;
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const clearToken = () => {
  localStorage.removeItem("token");
};
