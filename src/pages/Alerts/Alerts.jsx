import { Outlet } from "react-router-dom";
import { AlertContextProvider } from "../../contexts/AlertContext";

function Alerts() {
  return (
    <AlertContextProvider>
      <Outlet />
    </AlertContextProvider>
  );
}

export default Alerts;
