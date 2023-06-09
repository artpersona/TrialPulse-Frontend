import { useParams } from "react-router-dom";
import SponsorInfoComponent from "src/components/Sponsors/SponsorInfo";
import useGetSponsor from "../../../api/sponsors/useGetSponsor";

function SponsorInfo() {
  const { sponsorId } = useParams();

  const { api, sponsor } = useGetSponsor(sponsorId);

  if (api.isLoading) {
    return <div></div>;
  }
  return (
    <div>
      <SponsorInfoComponent data={sponsor} />
    </div>
  );
}

export default SponsorInfo;
