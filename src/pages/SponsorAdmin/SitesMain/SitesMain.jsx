import { Outlet, useSearchParams } from "react-router-dom";

import Sidebar from "src/components/Sidebar/Sidebar";
import SiteItem from "src/components/Sites/SiteItem/SiteItem";
import ContentSidebar from "src/components/ContentSidebar/ContentSidebar";
import useGetSitesBySponsor from "../../../api/sponsors/useGetSitesBySponsor";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useEffect } from "react";

function SitesMain() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    api.refetch({
      sort: searchParams.get("sort") || "",
    });
  }, [searchParams]);

  const {
    userDetails: { sponsorId },
  } = useAuthContext();

  const { sites, api, pagination } = useGetSitesBySponsor({
    sponsorId,
    sort: searchParams.get("sort") || "",
  });

  const getAvailableSites = () => {
    const uniqueRecords = [];
    const ids = new Set();

    for (const record of sites) {
      if (!ids.has(record.id)) {
        ids.add(record.id);
        uniqueRecords.push(record);
      }
    }

    return uniqueRecords;
  };

  if (api.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="relative">
      <Sidebar>
        <div>
          {getAvailableSites().map((item) => (
            <SiteItem key={item.id} data={item} noClick />
          ))}
        </div>
      </Sidebar>

      <ContentSidebar>{/* <Outlet /> */}</ContentSidebar>
    </div>
  );
}

export default SitesMain;
