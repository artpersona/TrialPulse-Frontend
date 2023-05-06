import { Outlet } from "react-router-dom";
import BlackNavbar from "../../../components/Protocols/BlackNavbar/BlackNavbar";
import SectionNavbar from "../../../components/Navbar/SectionNavbar/SectionNavbar";

const tabs = [
  {
    id: "info",
    label: "Info",
    path: "",
  },
  {
    id: "protocols",
    label: "Protocols",
    path: "protocols",
  },
  {
    id: "staff",
    label: "Staff",
    path: "staff",
  },
];

function SponsorDetails() {
  return (
    <div>
      <BlackNavbar>
        <SectionNavbar tabs={tabs} />
      </BlackNavbar>
      <Outlet />
    </div>
  );
}

export default SponsorDetails;
