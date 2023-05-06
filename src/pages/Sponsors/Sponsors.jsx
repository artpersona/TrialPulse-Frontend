import { Outlet } from "react-router-dom";
import { SponsorContextProvider } from "../../contexts/SponsorContext";

function Sponsors() {
  return (
    <SponsorContextProvider>
      <Outlet />
    </SponsorContextProvider>
  );
}

export default Sponsors;
