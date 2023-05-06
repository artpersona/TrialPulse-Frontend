import "./SitesMain.styles.css";
import Sidebar from "src/components/Sidebar/Sidebar";
import { useSiteContext } from "src/contexts/SiteContext";
import SiteItem from "../../../components/Sites/SiteItem/SiteItem";

function SitesMain() {
  const { sites } = useSiteContext();
  console.log(sites);
  return (
    <div className="sitesMain">
      <Sidebar>
        <div>
          {sites?.map((item) => (
            <SiteItem key={item.id} data={item} />
          ))}
        </div>
      </Sidebar>
    </div>
  );
}

export default SitesMain;
