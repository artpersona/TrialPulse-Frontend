import { useSearchParams } from "react-router-dom";

import useGetProtocols from "src/api/protocols/useGetProtocols";

import Study from "src/components/Protocols/Study";
import Sidebar from "src/components/Sidebar/Sidebar";
import ContentSidebar from "src/components/ContentSidebar/ContentSidebar";

import AddProtocol from "./AddProtocol";
import { useEffect } from "react";

function ProtocolsMain() {
  const [searchParams] = useSearchParams();

  const { api, protocols } = useGetProtocols({
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
