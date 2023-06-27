// PROTOCOLS
import Protocols from "../pages/Protocols";
import Overview from "../pages/Protocols/Overview";
import ProtocolsMain from "../pages/SponsorAdmin/ProtocolsMain/ProtocolsMain";
import Details from "../pages/Protocols/Details/Details";
import StudyInformation from "../pages/Protocols/StudyInformation";
import EligibilityCriteria from "../pages/Protocols/EligibilityCriteria";
import SitesLink from "../pages/Protocols/SitesLink";
import Documents from "../pages/Protocols/Documents";
import SitesLinkMain from "../pages/Protocols/SitesLink/SitesLinkMain";
import SiteInfo from "../pages/Protocols/SitesLink/SiteInfo";
import Schedule from "../pages/Protocols/StudyInformation/Schedule";
import GeneralInfo from "../pages/Protocols/StudyInformation/GeneralInfo";
import Inclusion from "../pages/Protocols/EligibilityCriteria/Inclusion";
import EditTreatments from "../pages/Protocols/StudyInformation/Schedule/EditTreatments";
import ScheduleMain from "../pages/Protocols/StudyInformation/Schedule/ScheduleMain";
import Exclusion from "../pages/Protocols/EligibilityCriteria/Exclusion";

// SITES
import Sites from "../pages/Sites";
import SitesMain from "../pages/SponsorAdmin/SitesMain/SitesMain";

// USERS
import Users from "../pages/Users";
import UsersMain from "../pages/SponsorAdmin/UsersMain/UsersMain";
import Sponsors from "../pages/Sponsors";
import SponsorsMain from "../pages/Sponsors/SponsorsMain";
import SponsorDetails from "../pages/Sponsors/SponsorDetails";
import SponsorInfo from "../pages/SponsorAdmin/SponsorInfo/SponsorInfo";
import SponsorProtocols from "../pages/SponsorAdmin/SponsorProtocols/SponsorProtocols";
import SponsorStaff from "../pages/SponsorAdmin/SponsorStaff/SponsorStaff";

import Home from "../pages/SponsorAdmin/Home/Home";

// SITES
import SiteDetails from "../pages/Sites/SiteDetails";
import SiteInformation from "../pages/Sites/SiteInfo";
import AddSponsor from "../pages/Sponsors/AddSponsor";
import AddSite from "../pages/Sites/AddSite";
import SiteProtocols from "../pages/Sites/SiteProtocols";
import AddUser from "../pages/Users/AddUser/AddUser";
import UserDetails from "../pages/Users/UserDetails/UserDetails";
import UserInformation from "../pages/Users/UserInfo/UserInfo";
import PDFPage from "../pages/Protocols/Documents/components/PDFPage/PDFPage";
import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "../pages/Error/NotFound";
import Layout from "../components/Layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <Layout />,
    children: [
      {
        path: "",
        // element: <Navigate to="/sponsors" />,
        element: <Home />,
      },
      // START OF SPONSORS
      {
        path: "sponsors",
        element: <Home />,
        children: [
          {
            path: "",
            element: <SponsorInfo />,
          },
          {
            path: "protocols",
            element: <SponsorProtocols />,
          },
          {
            path: "staff",
            element: <SponsorStaff />,
          },
        ],
      },
      // START OF PROTOCOLS
      {
        path: "protocols",
        element: <Protocols />,
        children: [
          {
            path: "",
            element: <ProtocolsMain />,
          },
          {
            path: "details/:protocolId",
            element: <Details />,
            children: [
              {
                path: "",
                element: <Overview />,
              },
              {
                path: "study-information",
                element: <StudyInformation />,
                children: [
                  {
                    path: "",
                    element: <GeneralInfo />,
                  },
                  {
                    path: "schedule",
                    element: <ScheduleMain />,
                    children: [
                      {
                        path: "",
                        element: <Schedule />,
                      },
                      {
                        path: "edit-treatments",
                        element: <EditTreatments />,
                      },
                    ],
                  },
                  {
                    path: "table-of-contents",
                    element: <Schedule />,
                  },
                ],
              },
              {
                path: "eligibility-criteria",
                element: <EligibilityCriteria />,
                children: [
                  {
                    path: "",
                    element: <Inclusion />,
                  },
                  {
                    path: "exclusion",
                    element: <Exclusion />,
                  },
                ],
              },
              {
                path: "sites-link",
                element: <SitesLinkMain />,
                children: [
                  {
                    path: "",
                    element: <SitesLink />,
                  },
                  {
                    path: ":sitesId/info",
                    element: <SiteInfo />,
                  },
                ],
              },
              {
                path: "documents",
                element: <Documents />,
                children: [
                  {
                    path: "",
                    element: <PDFPage />,
                  },
                  {
                    path: "images",
                    element: <PDFPage />,
                  },
                  {
                    path: "other",
                    element: <PDFPage />,
                  },
                ],
              },
            ],
          },
        ],
      },

      // END OF PROTOCOLS

      // START OF SITES
      {
        path: "sites",
        element: <Sites />,
        children: [
          {
            path: "",
            element: <SitesMain />,
            children: [
              {
                path: "",
                element: <AddSite />,
              },
              {
                path: ":siteId",
                element: <SiteDetails />,
                children: [
                  {
                    path: "",
                    element: <SiteInformation />,
                  },
                  {
                    path: "protocols",
                    element: <SiteProtocols />,
                  },
                  {
                    path: "staff",
                    element: <SponsorStaff />,
                  },
                ],
              },
            ],
          },
        ],
      },

      // END OF SITES

      // START OF USERS
      {
        path: "users",
        element: <Users />,
        children: [
          {
            path: "",
            element: <UsersMain />,
            children: [
              {
                path: "",
                element: <AddUser />,
              },
              {
                path: ":userId",
                element: <UserDetails />,
                children: [
                  {
                    path: "",
                    element: <UserInformation />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
