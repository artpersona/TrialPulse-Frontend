import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { privateClient } from "../api";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await privateClient({
        url: "/users?page=1",
        method: "get",
      });
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider value={{ users, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

UserContextProvider.propTypes = {
  children: PropTypes.element,
};
