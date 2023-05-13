import { Outlet } from "react-router-dom";

import { ProtocolContextProvider } from "src/contexts/ProtocolContext";

function Protocols() {
  return (
    <ProtocolContextProvider>
      <Outlet />
    </ProtocolContextProvider>
  );
}

export default Protocols;
