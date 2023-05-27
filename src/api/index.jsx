import axios from "axios";
import { clearToken, clearUser, getToken } from "../utils/styles/token";

export const publicClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

privateClient.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// privateClient.interceptors.response.use(
//   async (response) => {
//     return response;
//   },
//   (error) => {
//     const _error = error.response;
//     if (_error && _error.status === 401) {
//       clearToken();
//       clearUser();
//       window.location.reload();
//       throw error;
//     }
//     return error;
//   }
// );
