import { createContext, useContext, useEffect, useState } from "react";
import { publicClient } from "../api";
import { setToken } from "../utils/styles/token";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    console.log(currentUser);
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

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
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setToken(res.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
