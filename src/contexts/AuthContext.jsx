import { createContext, useContext, useEffect, useState } from "react";
import { publicClient } from "../api";
import { setToken } from "../utils/styles/token";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = localStorage.getItem("user");
  const currentUserDetails = localStorage.getItem("user-details");

  useEffect(() => {
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [currentUser]);

  useEffect(() => {
    if (currentUserDetails) {
      setUserDetails(JSON.parse(currentUserDetails));
    } else {
      setUserDetails(null);
    }
    setLoading(false);
  }, [currentUserDetails]);

  const login = async (data) => {
    try {
      const res = await publicClient({
        url: "/Auth",
        data: {
          username: data.email,
          password: data.password,
        },
        method: "post",
      });

      const detailsRes = await axios({
        baseURL: import.meta.env.VITE_API_URL,
        url: "/users/details",
        headers: {
          Authorization: `Bearer ${res.data.accessToken}`,
        },
      });

      setUser(res.data);
      setUserDetails(detailsRes.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("user-details", JSON.stringify(detailsRes.data));
      setToken(res.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userDetails, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

import PropTypes from "prop-types";

AuthContextProvider.propTypes = {
  children: PropTypes.element,
};
