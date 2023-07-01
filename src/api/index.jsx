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

// const setAuthorizationHeader = () => {
//   const token = getToken();
//   if (token) {
//     privateClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   }
// };

privateClient.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

privateClient.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    // if (error.response?.data?.isTokenExpired) {
    //   publicClient({
    //     url: "/auth/refresh",
    //     method: "post",
    //     data: {
    //       refreshToken: getRefreshToken(),
    //     },
    //   }).then((response) => {
    //     if (response.status === 200) {
    //       localStorage.setItem("user", JSON.stringify(response.data));
    //       const { accessToken } = response.data;
    //       setToken(accessToken);
    //     } else {
    //       clearToken();
    //       clearUser();
    //       window.location.reload();
    //     }
    //   });
    //   // console.log("token expired");
    // } else {
    //   return error;
    // }
    const _error = error.response;
    if (_error && _error.status === 401) {
      if (_error.data?.isTokenExpired) {
        clearToken();
        clearUser();
        // window.location.reload();
        window.location.href = "/?sessionExpired=true";
        throw _error;
      }
    }
    return _error;
  }
);

// let isRefreshing = false;
// let refreshSubscribers = [];

// privateClient.interceptors.response.use(
//   async (response) => {
//     return response;
//   },
//   (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve) => {
//           refreshSubscribers.push((token) => {
//             originalRequest.headers.Authorization = "Bearer " + token;
//             resolve(privateClient(originalRequest));
//           });
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       return new Promise((resolve, reject) => {
//         // Call your refresh auth token API here
//         publicClient({
//           url: "/auth/refresh",
//           method: "post",
//           data: {
//             refreshToken: getRefreshToken(),
//           },
//         })
//           .then((response) => {
//             if (response.status === 200) {
//               localStorage.setItem("user", JSON.stringify(response.data));
//               const { accessToken } = response.data;

//               // Update the auth token in your private client
//               // privateClient.defaults.headers.common["Authorization"] =
//               //   "Bearer " + accessToken;

//               // Execute all the requests that encountered 401 error
//               // refreshSubscribers[refreshSubscribers.length - 1](accessToken);
//               // refreshSubscribers = [];
//               resolve(privateClient(originalRequest));
//             } else {
//               // Refresh token API failed, handle the error as per your requirements
//               reject(error);
//             }
//           })
//           .catch((error) => {
//             // Refresh token API failed, handle the error as per your requirements
//             reject(error);
//           })
//           .finally(() => {
//             isRefreshing = false;
//           });
//       });
//     }

//     return Promise.reject(error);
//   }
// );
