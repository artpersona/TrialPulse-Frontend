import { useParams } from "react-router-dom";

import useGetProtocolsBySponsor from "src/api/sponsors/useGetProtocolsBySponsor";

import ProtocolItem from "src/components/Sponsors/ProtocolItem";

function SponsorProtocols() {
  const { sponsorId } = useParams();

  const { api, protocols } = useGetProtocolsBySponsor({sponsorId, sort: ""});

  if (api.isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      {protocols?.map((item) => (
        <ProtocolItem key={item.id} data={item} />
      ))}
    </div>
  );
}

export default SponsorProtocols;
