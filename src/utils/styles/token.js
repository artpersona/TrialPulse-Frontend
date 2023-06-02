export const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) return token;
  return null;
};

export const getRefreshToken = () => {
  const token = localStorage.getItem("user");
  if (token) return JSON.parse(token).refreshToken;
  return null;
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

export const clearUser = () => {
  localStorage.removeItem("user");
};
