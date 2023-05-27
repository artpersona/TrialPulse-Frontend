import { Outlet } from "react-router-dom";

import useGetSponsors from "src/api/sponsors/useGetSponsors";

import Sidebar from "src/components/Sidebar/Sidebar";
import SponsorItem from "src/components/Sponsors/SponsorItem/SponsorItem";
import ContentSidebar from "src/components/ContentSidebar/ContentSidebar";

function SponsorsMain() {
  const { sponsors, api, pagination } = useGetSponsors();

  if (api.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="relative">
      <Sidebar>
        <div>
          {sponsors.map((item) => (
            <SponsorItem key={item.id} data={item} />
          ))}
        </div>
      </Sidebar>

      <ContentSidebar>
        <Outlet />
      </ContentSidebar>
    </div>
  );
}

export default SponsorsMain;
