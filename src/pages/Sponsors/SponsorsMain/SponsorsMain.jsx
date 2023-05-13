import { Outlet } from "react-router-dom";

import { useSponsorContext } from "src/contexts/SponsorContext";

import Sidebar from "src/components/Sidebar/Sidebar";
import SponsorItem from "src/components/Sponsors/SponsorItem/SponsorItem";
import ContentSidebar from "src/components/ContentSidebar/ContentSidebar";

function SponsorsMain() {
  const { sponsors } = useSponsorContext();

  return (
    <div className="relative">
      <Sidebar>
        <div>
          {sponsors?.map((item) => (
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
