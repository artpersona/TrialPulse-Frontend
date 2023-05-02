import SitesLinkComponent from "src/components/Protocols/SitesLink";
import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";

function SitesLink() {
  return (
    <div>
      <BlackNavbar />
      <SitesLinkComponent title="Clinic across the Street" />
      <SitesLinkComponent title="Clinic across the Street" />
      <SitesLinkComponent title="Clinic across the Street" />
    </div>
  );
}

export default SitesLink;
