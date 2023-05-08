import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { privateClient } from "../../../api";
import Notes from "../../../components/Protocols/Notes/Notes";
import Site from "../../../components/Protocols/Site/Site";

function SiteInformation() {
  const { siteId } = useParams();

  const [loading, setLoading] = useState(true);
  const [site, setSite] = useState(null);

  useEffect(() => {
    fetchSponsor();
  }, [siteId]);

  async function fetchSponsor() {
    try {
      const res = await privateClient({
        url: `/sites/${siteId}`,
        method: "get",
      });
      setSite(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="pb-20">
      <Site title={site?.name} />
      <Notes />
    </div>
  );
}

export default SiteInformation;
