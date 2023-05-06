import "./SponsorsMain.styles.css";
import Sidebar from "src/components/Sidebar/Sidebar";
import { useSponsorContext } from "../../../contexts/SponsorContext";
import SponsorItem from "../../../components/Sponsors/SponsorItem/SponsorItem";
import { Outlet } from "react-router-dom";

function SponsorsMain() {
  const { sponsors } = useSponsorContext();
  console.log(sponsors);
  return (
    <div className="sponsorsMain">
      <Sidebar>
        <div>
          {sponsors?.map((item) => (
            <SponsorItem key={item.id} data={item} />
          ))}
        </div>
      </Sidebar>

      <div className="sponsorsMain__content">
        <Outlet />
      </div>
    </div>
  );
}

export default SponsorsMain;
