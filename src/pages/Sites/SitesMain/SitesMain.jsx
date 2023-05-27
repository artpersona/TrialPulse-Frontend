import { Outlet } from "react-router-dom";

import useGetSites from "src/api/sites/useGetSites";

import Sidebar from "src/components/Sidebar/Sidebar";
import SiteItem from "src/components/Sites/SiteItem/SiteItem";
import ContentSidebar from "src/components/ContentSidebar/ContentSidebar";

function SitesMain() {
  const { sites, api, pagination } = useGetSites();

  if (api.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="relative">
      <Sidebar>
        <div>
          {sites.map((item) => (
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
