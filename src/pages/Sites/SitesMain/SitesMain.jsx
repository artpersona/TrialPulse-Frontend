import { Outlet } from "react-router-dom";

import { useSiteContext } from "src/contexts/SiteContext";

import Sidebar from "src/components/Sidebar/Sidebar";
import SiteItem from "src/components/Sites/SiteItem/SiteItem";
import ContentSidebar from "src/components/ContentSidebar/ContentSidebar";

function SitesMain() {
  const { sites } = useSiteContext();

  return (
    <div className="relative">
      <Sidebar>
        <div>
          {sites?.map((item) => (
            <SiteItem key={item.id} data={item} />
          ))}
        </div>
      </Sidebar>

      <ContentSidebar>
        <Outlet />
      </ContentSidebar>
    </div>
  );
}

export default SitesMain;
