import SponsorInfoComponent from "src/components/Sponsors/SponsorInfo";
import useGetSponsor from "../../../api/sponsors/useGetSponsor";
import { useAuthContext } from "../../../contexts/AuthContext";

function Home() {
  const { userDetails } = useAuthContext();

  const { sponsorId } = userDetails;

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

export default Home;
