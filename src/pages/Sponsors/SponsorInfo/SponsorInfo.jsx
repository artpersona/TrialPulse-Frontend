import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SponsorInfoComponent from "src/components/Sponsors/SponsorInfo";
import { privateClient } from "../../../api";

function SponsorInfo() {
  const { sponsorId } = useParams();

  const [loading, setLoading] = useState(true);
  const [sponsor, setSponsor] = useState(null);

  useEffect(() => {
    fetchSponsor();
  }, [sponsorId]);

  async function fetchSponsor() {
    try {
      const res = await privateClient({
        url: `/sponsors/${sponsorId}`,
        method: "get",
      });
      setSponsor(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <div></div>;
  }
  return (
    <div>
      <SponsorInfoComponent data={sponsor} />
    </div>
  );
}

export default SponsorInfo;
