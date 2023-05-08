import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { privateClient } from "../api";

export const SponsorContext = createContext();

export const SponsorContextProvider = ({ children }) => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetchSponsors();
  }, []);

  async function fetchSponsors() {
    try {
      const res = await privateClient({
        url: "/sponsors?page=1",
        method: "get",
      });
      setSponsors(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SponsorContext.Provider value={{ sponsors, fetchSponsors }}>
      {children}
    </SponsorContext.Provider>
  );
};

export const useSponsorContext = () => useContext(SponsorContext);

SponsorContextProvider.propTypes = {
  children: PropTypes.element,
};
