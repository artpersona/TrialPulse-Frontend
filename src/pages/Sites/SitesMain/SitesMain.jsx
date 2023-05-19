import { Outlet } from "react-router-dom";

import useGetSites from "src/api/sites/useGetSites";

import Sidebar from "src/components/Sidebar/Sidebar";
import SiteItem from "src/components/Sites/SiteItem/SiteItem";
import ContentSidebar from "src/components/ContentSidebar/ContentSidebar";

function SitesMain() {
  const { isLoading, isFetching, data } = useGetSites();

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className="relative">
      <Sidebar>
        <div>
          {data.data?.data?.map((item) => (
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
