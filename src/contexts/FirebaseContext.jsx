import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import { getDatabase } from "firebase/database";
import { app } from "../config/FirebaseConfig";
export const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
  const database = getDatabase();

  return (
    <FirebaseContext.Provider value={{ app, database }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseContext = () => useContext(FirebaseContext);

FirebaseContextProvider.propTypes = {
  children: PropTypes.element,
};
