import { Outlet } from "react-router-dom";
import { SiteContextProvider } from "src/contexts/SiteContext";

function Sites() {
  return (
    <SiteContextProvider>
      <Outlet />
    </SiteContextProvider>
  );
}

export default Sites;
