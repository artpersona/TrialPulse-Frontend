import { createContext, useContext, useEffect, useState } from "react";
import { publicClient } from "../api";
import { setToken } from "../utils/styles/token";
import axios from "axios";
import { ref, set, get, onValue } from "firebase/database";
import { useFirebaseContext } from "./FirebaseContext";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { database } = useFirebaseContext();
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

  const createProfile = (user) => {
    return new Promise((resolve, reject) => {
      const userRef = ref(database, "users/" + user.id);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists() && snapshot.val().id !== undefined) {
            realtimeUserListener(user);
          } else {
            let userData = {
              ...user,
            };

            if (snapshot.val() !== null) {
              userData = {
                ...userData,
                ...snapshot.val(),
              };
            }
            set(userRef, userData)
              .then(() => {
                resolve(userData);
              })
              .catch((err) => {
                console.log("Error:", err);
                reject(err);
              });
          }
        })
        .catch((err) => {
          console.log("Error:", err);
          reject(err);
        });
    });
  };

  const realtimeUserListener = (user) => {
    const userRef = ref(database, "users/" + user.id);

    onValue(userRef, (snapshot) => {
      if (snapshot.exists() && snapshot.val().id !== undefined) {
        console.log("user exists!");
        console.log("user details", snapshot.val());
        setUserDetails(snapshot.val());
        localStorage.setItem("user-details", JSON.stringify(snapshot.val()));
      } else {
        console.log("user does not exists!");
        createProfile(user)
          .then((newData) => {
            setUserDetails(newData);
            localStorage.setItem("user-details", JSON.stringify(newData));
          })
          .catch((err) => {
            console.log("error sa create profile", err);
          });
      }
    });
  };

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
      realtimeUserListener(detailsRes.data);
      localStorage.setItem("user", JSON.stringify(res.data));
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
