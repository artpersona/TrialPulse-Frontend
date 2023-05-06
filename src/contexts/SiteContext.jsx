import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { privateClient } from "../api";

export const SiteContext = createContext();

export const SiteContextProvider = ({ children }) => {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetchSites();
  }, []);

  async function fetchSites() {
    try {
      const res = await privateClient({
        url: "/sites?page=1",
        method: "get",
      });
      setSites(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SiteContext.Provider value={{ sites }}>{children}</SiteContext.Provider>
  );
};

export const useSiteContext = () => useContext(SiteContext);

SiteContextProvider.propTypes = {
  children: PropTypes.element,
};
