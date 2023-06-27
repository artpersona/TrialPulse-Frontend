import { Outlet, useSearchParams } from "react-router-dom";

import useGetSites from "src/api/sites/useGetSites";

import Sidebar from "src/components/Sidebar/Sidebar";
import SiteItem from "src/components/Sites/SiteItem/SiteItem";
import ContentSidebar from "src/components/ContentSidebar/ContentSidebar";
import { useEffect } from "react";

function SitesMain() {
  const [searchParams] = useSearchParams();

  const { sites, api } = useGetSites({
    sort: searchParams.get("sort") || "",
  });

  useEffect(() => {
    api.refetch({
      sort: searchParams.get("sort") || "",
    });
  }, [searchParams]);

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
