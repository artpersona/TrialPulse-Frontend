import { useProtocolContext } from "src/contexts/ProtocolContext";

import Study from "src/components/Protocols/Study";
import Sidebar from "src/components/Sidebar/Sidebar";
import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";
import ContentSidebar from "src/components/ContentSidebar/ContentSidebar";

import AddProtocol from "./AddProtocol";

const tabs = [
  {
    id: 0,
    label: "ABC",
  },
  {
    id: 1,
    label: "Recently Viewed",
  },
  {
    id: 2,
    label: "Last Updated",
  },
];

function ProtocolsMain() {
  const { protocols } = useProtocolContext();

  return (
    <div className="relative">
      {/* CONTENT */}
      <Sidebar>
        <BlackNavbar tabs={tabs} />
        {/* STUDIES LIST */}
        <div className="protocols__sidebarLists">
          {protocols.map((protocol) => (
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
