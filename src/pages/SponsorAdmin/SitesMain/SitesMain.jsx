import { Outlet } from "react-router-dom";

import Sidebar from "src/components/Sidebar/Sidebar";
import SiteItem from "src/components/Sites/SiteItem/SiteItem";
import ContentSidebar from "src/components/ContentSidebar/ContentSidebar";
import useGetSitesBySponsor from "../../../api/sponsors/useGetSitesBySponsor";
import { useAuthContext } from "../../../contexts/AuthContext";

function SitesMain() {
  const {
    userDetails: { sponsorId },
  } = useAuthContext();

  const { sites, api, pagination } = useGetSitesBySponsor(sponsorId);

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
            <SiteItem key={item.id} data={item} />
          ))}
        </div>
      </Sidebar>

      <ContentSidebar>{/* <Outlet /> */}</ContentSidebar>
    </div>
  );
}

export default SitesMain;
