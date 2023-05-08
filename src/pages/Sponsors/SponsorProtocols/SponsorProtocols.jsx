import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { privateClient } from "../../../api";
import ProtocolItem from "../../../components/Sponsors/ProtocolItem";

function SponsorProtocols() {
  const { sponsorId } = useParams();

  const [protocols, setProtocols] = useState([]);

  useEffect(() => {
    fetchProtocols();
  }, []);

  async function fetchProtocols() {
    try {
      const res = await privateClient({
        url: `/sponsors/${sponsorId}/protocols?page=1`,
        method: "get",
      });
      setProtocols(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {protocols.map((item) => (
        <ProtocolItem key={item.id} data={item} />
      ))}
    </div>
  );
}

export default SponsorProtocols;
