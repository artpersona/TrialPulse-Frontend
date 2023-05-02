import Site from "src/components/Protocols/Site";
import Notes from "src/components/Protocols/Notes";
import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import colorPalette from "src/utils/styles/colorPalette";
import { useNavigate } from "react-router-dom";

function SiteInfo() {
  const navigate = useNavigate();

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
      <Site title="Clinic across the street" />
      <Notes />
    </div>
  );
}

export default SiteInfo;
