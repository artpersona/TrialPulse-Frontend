import { Outlet } from "react-router-dom";
import "./Layout.styles.css";
import TopNavbar from "../Navbar/TopNavbar/TopNavbar";

function Layout() {
  return (
    <div className="layout">
      <TopNavbar />

      {/* ROUTE CONTENT */}
      <div className="layout__content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
