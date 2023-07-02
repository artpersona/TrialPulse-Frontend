import { Outlet } from "react-router-dom";

import Sidebar from "src/components/Sidebar/Sidebar";
import UserItem from "src/components/Users/UserItem/UserItem";
import ContentSidebar from "src/components/ContentSidebar/ContentSidebar";
import useGetUsersBySponsor from "../../../api/sponsors/useGetUsersBySponsor";
import { useAuthContext } from "../../../contexts/AuthContext";

function UsersMain() {
  const {
    userDetails: { sponsorId },
  } = useAuthContext();

  const { api, users } = useGetUsersBySponsor(sponsorId);

  if (api.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="relative">
      <Sidebar hideNavbar>
        <div>
          {users?.map((item) => (
            <UserItem key={item.id} data={item} />
          ))}
        </div>
      </Sidebar>

      <ContentSidebar>
        <Outlet />
      </ContentSidebar>
    </div>
  );
}

export default UsersMain;
