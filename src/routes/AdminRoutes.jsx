// PROTOCOLS
import Protocols from "../pages/Protocols";
import Overview from "../pages/Protocols/Overview";
import ProtocolsMain from "../pages/Protocols/ProtocolsMain/ProtocolsMain";
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
import SitesMain from "../pages/Sites/SitesMain";

// USERS
import Users from "../pages/Users";
import UsersMain from "../pages/Users/UsersMain";
import Sponsors from "../pages/Sponsors";
import SponsorsMain from "../pages/Sponsors/SponsorsMain";
import SponsorDetails from "../pages/Sponsors/SponsorDetails";
import SponsorInfo from "../pages/Sponsors/SponsorInfo";
import SponsorProtocols from "../pages/Sponsors/SponsorProtocols";
import SponsorStaff from "../pages/Sponsors/SponsorStaff/SponsorStaff";

// CHAT
import Chat from "../pages/Chat";
import ChatLanding from "../pages/Chat/ChatLanding/ChatLanding";
import EmptyChat from "../pages/Chat/EmptyChat/EmptyChat";
import Home from "../pages/Home/Home";
import IndividualChat from "../pages/Chat/IndividualChat/IndividualChat";
// SITES
import SiteDetails from "../pages/Sites/SiteDetails";
import SiteInformation from "../pages/Sites/SiteInfo";
import AddSponsor from "../pages/Sponsors/AddSponsor";
import AddSite from "../pages/Sites/AddSite";
import SiteProtocols from "../pages/Sites/SiteProtocols";
import AddUser from "../pages/Users/AddUser/AddUser";
import EditUser from "../pages/Users/EditUser/EditUser";
import UserDetails from "../pages/Users/UserDetails/UserDetails";
import UserInformation from "../pages/Users/UserInfo/UserInfo";
import PDFPage from "../pages/Protocols/Documents/components/PDFPage/PDFPage";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/Error/NotFound";
import Layout from "../components/Layout/Layout";
import SiteStaff from "../pages/Sites/SiteStaff/SiteStaff";
import EditSponsor from "../pages/Sponsors/EditSponsor/EditSponsor";
import EditGeneralInfo from "../pages/Protocols/StudyInformation/EditGeneralInfo/EditGeneralInfo";
import EditSite from "../pages/Sites/EditSite/EditSite";
import Alerts from "../pages/Alerts/Alerts";
import AlertsMain from "../pages/Alerts/AlertsMain/AlertsMain";
import AddAlert from "../pages/Alerts/AddAlert";
import AlertDetails from "../pages/Alerts/AlertDetails";
import AlertInformation from "../pages/Alerts/AlertInfo/AlertInfo";
import EditAlert from "../pages/Alerts/EditAlert/EditAlert";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      // START OF SPONSORS

      {
        path: "sponsors",
        element: <Sponsors />,
        children: [
          {
            path: "",
            element: <SponsorsMain />,
            children: [
              {
                path: "",
                element: <AddSponsor />,
              },
              {
                path: ":sponsorId",
                element: <SponsorDetails />,
                children: [
                  {
                    path: "",
                    element: <SponsorInfo />,
                  },
                  {
                    path: "edit-sponsor",
                    element: <EditSponsor />,
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
            ],
          },
        ],
      },

      // END OF SPONSORS

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
                    path: "edit-general-info",
                    element: <EditGeneralInfo />,
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
                    path: "videos",
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
                    path: "edit-site",
                    element: <EditSite />,
                  },
                  {
                    path: "staff",
                    element: <SiteStaff />,
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
                  {
                    path: "edit-user",
                    element: <EditUser />,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        path: "chat",
        element: <Chat />,
        children: [
          {
            path: "",
            element: <ChatLanding />,
            children: [
              {
                path: "",
                element: <EmptyChat />,
              },
              {
                path: ":userId",
                element: <IndividualChat />,
              },
            ],
          },
        ],
      },

      // END OF USERS

      // START OF ALERTS
      {
        path: "alerts",
        element: <Alerts />,
        children: [
          {
            path: "",
            element: <AlertsMain />,
            // children: [],
            children: [
              {
                path: "",
                element: <AddAlert />,
              },
              {
                path: ":alertId",
                element: <AlertDetails />,
                // children: [],
                children: [
                  {
                    path: "",
                    element: <AlertInformation />,
                  },
                  {
                    path: "edit-alert",
                    element: <EditAlert />,
                  },
                ],
              },
            ],
          },
        ],
      },

      // END OF ALERTS
    ],
  },
]);

export default router;
