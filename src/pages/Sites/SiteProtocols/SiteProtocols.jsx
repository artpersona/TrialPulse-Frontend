import { useState } from "react";
import { useParams } from "react-router-dom";

import useGetProtocolsBySite from "src/api/sites/useGetProtocolsBySite";
import useCreateSiteByProtocol from "src/api/protocols/sites/useCreateSiteByProtocol";

import AddButton from "src/components/AddButton/AddButton";
import ProtocolItem from "src/components/Sites/ProtocolItem/ProtocolItem";
import AddProtocol from "src/components/Protocols/Modals/AddProtocol";

function SiteProtocols() {
  const { siteId } = useParams();

  const { api, protocols } = useGetProtocolsBySite(siteId);

  const { mutate } = useCreateSiteByProtocol({
    resetForm: () => null,
  });

  const [showAddProtocolsModal, setShowAddProtocolsModal] = useState(false);

  async function addSiteProtocol(protocolId) {
    mutate({
      data: {
        siteId,
      },
      protocolId,
    });
  }

  if (api.isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <AddButton
        title="Add Protocol"
        onClick={() => setShowAddProtocolsModal(true)}
      />

      {protocols.map((item) => (
        <ProtocolItem key={item.id} data={item} />
      ))}

      {showAddProtocolsModal ? (
        <AddProtocol
          handleAdd={addSiteProtocol}
          currentProtocols={protocols}
          onProceed={() => setShowAddProtocolsModal(false)}
        />
      ) : null}
    </div>
  );
}

export default SiteProtocols;
