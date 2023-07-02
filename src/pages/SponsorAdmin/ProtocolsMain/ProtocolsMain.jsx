import { useSearchParams } from "react-router-dom";

import Study from "src/components/Protocols/Study";
import Sidebar from "src/components/Sidebar/Sidebar";
import ContentSidebar from "src/components/ContentSidebar/ContentSidebar";

import { useEffect } from "react";
import useGetProtocolsBySponsor from "../../../api/sponsors/useGetProtocolsBySponsor";
import { useAuthContext } from "../../../contexts/AuthContext";
import AddProtocol from "./AddProtocol";

function ProtocolsMain() {
  const { userDetails } = useAuthContext();
  const { sponsorId } = userDetails;

  const [searchParams] = useSearchParams();

  const { api, protocols } = useGetProtocolsBySponsor({
    sponsorId,
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
      {/* CONTENT */}
      <Sidebar>
        {/* STUDIES LIST */}
        <div className="protocols__sidebarLists">
          {protocols?.map((protocol) => (
            <Study data={protocol} key={protocol.id} />
          ))}
        </div>
      </Sidebar>
      <ContentSidebar>
        <AddProtocol />
      </ContentSidebar>
    </div>
  );
}

export default ProtocolsMain;
