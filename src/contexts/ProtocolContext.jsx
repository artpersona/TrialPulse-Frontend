import { createContext, useContext, useEffect, useState } from "react";
import { privateClient } from "../api";

export const ProtocolContext = createContext();

export const ProtocolContextProvider = ({ children }) => {
  const { userDetails } = useAuthContext();
  const [protocols, setProtocols] = useState([]);
  const [selectedProtocol, setSelectedProtocol] = useState(null);

  useEffect(() => {
    fetchProtocols();
  }, []);

  async function fetchProtocols() {
    try {
      const res = await privateClient({
        url:
          userDetails?.roleId === 4
            ? `/sponsors/${userDetails.id}/protocols?page=1`
            : "/protocols?page=1",
        method: "get",
      });
      setProtocols(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function setProtocol(id) {
    try {
      const res = await privateClient({
        url: "/protocols/" + id,
        method: "get",
      });

      setSelectedProtocol(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  function getSelectedProtocol() {
    return selectedProtocol;
  }

  async function addCriteria(data) {
    return new Promise((resolve, reject) => {
      privateClient({
        url: `protocols/${selectedProtocol.id}/eligibility-criterias`,
        method: "post",
        data,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  async function addSite(protocolId, siteId) {
    return new Promise((resolve, reject) => {
      privateClient({
        url: `protocols/${protocolId}/sites`,
        method: "post",
        data: {
          siteId,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  return (
    <ProtocolContext.Provider
      value={{
        protocols,
        setProtocol,
        getSelectedProtocol,
        addCriteria,
        addSite,
        fetchProtocols,
      }}
    >
      {children}
    </ProtocolContext.Provider>
  );
};

export const useProtocolContext = () => useContext(ProtocolContext);

import PropTypes from "prop-types";
import { useAuthContext } from "./AuthContext";

ProtocolContextProvider.propTypes = {
  children: PropTypes.element,
};
