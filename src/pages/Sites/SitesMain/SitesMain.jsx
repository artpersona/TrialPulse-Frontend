import "./SitesMain.styles.css";
import Sidebar from "src/components/Sidebar/Sidebar";
import { useSiteContext } from "src/contexts/SiteContext";
import SiteItem from "../../../components/Sites/SiteItem/SiteItem";
import { Outlet } from "react-router-dom";

function SitesMain() {
  const { sites } = useSiteContext();
  return (
    <div className="relative">
      <Sidebar>
        <div>
          {sites?.map((item) => (
            <SiteItem key={item.id} data={item} />
          ))}
        </div>
      </Sidebar>

      <div className="flex flex-col items-center justify-center pt-[100px] pl-[470px]">
        <Outlet />
      </div>
    </div>
  );
}

export default SitesMain;
