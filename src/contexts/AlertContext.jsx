import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { privateClient } from "../api";

export const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  async function fetchAlerts() {
    try {
      const res = await privateClient({
        url: "/alerts?page=1",
        method: "get",
      });
      setAlerts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AlertContext.Provider value={{ alerts, fetchAlerts }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);

AlertContextProvider.propTypes = {
  children: PropTypes.element,
};
