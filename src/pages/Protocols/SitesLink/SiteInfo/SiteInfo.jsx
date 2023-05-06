import Site from "src/components/Protocols/Site";
import Notes from "src/components/Protocols/Notes";
import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import colorPalette from "src/utils/styles/colorPalette";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { privateClient } from "../../../../api";

function SiteInfo() {
  const { sitesId, protocolId } = useParams();

  const navigate = useNavigate();

  const [site, setSite] = useState(null);

  useEffect(() => {
    fetchSite();
  }, []);

  async function fetchSite() {
    try {
      const res = await privateClient({
        url: `sites/` + sitesId,
        method: "get",
      });
      setSite(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <BlackNavbar>
        <div
          style={{ width: "100%", textAlign: "left", paddingLeft: 20 }}
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon
            width={24}
            height={24}
            color={colorPalette.SECONDARY_COLOR}
            style={{ cursor: "pointer" }}
          />
        </div>
      </BlackNavbar>
      <Site title={site?.name} />
      <Notes />
    </div>
  );
}

export default SiteInfo;
