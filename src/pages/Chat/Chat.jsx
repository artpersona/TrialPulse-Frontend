import { Outlet } from "react-router-dom";
import { UserContextProvider } from "src/contexts/UserContext";

function Chat() {
  return (
    <UserContextProvider>
      <Outlet />
    </UserContextProvider>
  );
}

export default Chat;
