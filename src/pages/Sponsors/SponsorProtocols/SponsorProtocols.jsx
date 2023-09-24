import { useParams } from "react-router-dom";

import useGetProtocolsBySponsor from "src/api/sponsors/useGetProtocolsBySponsor";

import ProtocolItem from "src/components/Sponsors/ProtocolItem";
import { useState } from "react";
import AddButton from "src/components/AddButton/AddButton";
import AddProtocolModal from "../../Protocols/ProtocolsMain/AddProtocolModal";

function SponsorProtocols() {
  const { sponsorId } = useParams();
  const [showAddProtocols, setShowAddProtocols] = useState(false);

  const { api, protocols } = useGetProtocolsBySponsor({sponsorId, sort: ""});

  if (api.isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div className="pb-10 relative">
    <AddButton
        title="Add Protocol"
        onClick={() => setShowAddProtocols(true)}
      />
      {protocols?.map((item) => (
        <ProtocolItem key={item.id} data={item} />
      ))}
      {showAddProtocols ? (
        <AddProtocolModal
          onCancel={() => setShowAddProtocols(false)}
        />
      ) : null}
    </div>
  );
}

export default SponsorProtocols;
