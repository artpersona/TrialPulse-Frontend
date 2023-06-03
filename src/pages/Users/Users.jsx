import { Outlet } from "react-router-dom";
import { UserContextProvider } from "src/contexts/UserContext";

function Users() {
	return (
		<UserContextProvider>
			<Outlet />
		</UserContextProvider>
	);
}

export default Users;
