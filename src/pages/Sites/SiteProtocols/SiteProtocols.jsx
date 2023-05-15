import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { privateClient } from "src/api";

import { useProtocolContext } from "src/contexts/ProtocolContext";

import AddButton from "src/components/AddButton/AddButton";
import ProtocolItem from "src/components/Sites/ProtocolItem/ProtocolItem";
import AddProtocol from "src/components/Protocols/Modals/AddProtocol";

function SiteProtocols() {
  const { addSite } = useProtocolContext();

  const { siteId } = useParams();

  const [protocols, setProtocols] = useState([]);
  const [showAddProtocolsModal, setShowAddProtocolsModal] = useState(false);

  useEffect(() => {
    fetchProtocols();
  }, []);

  async function fetchProtocols() {
    try {
      const res = await privateClient({
        url: `/sites/${siteId}/protocols?page=1`,
        method: "get",
      });
      setProtocols(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addSiteProtocol(protocolId) {
    try {
      await addSite(protocolId, siteId);
      fetchProtocols();
    } catch (error) {
      console.log(error);
    }
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
