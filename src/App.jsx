import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";

import Layout from "./components/Layout/Layout";
import NotFound from "./pages/Error/NotFound";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

// PROTOCOLS
import Protocols from "./pages/Protocols";
import Overview from "./pages/Protocols/Overview";
import ProtocolsMain from "./pages/Protocols/ProtocolsMain/ProtocolsMain";
import Details from "./pages/Protocols/Details/Details";
import StudyInformation from "./pages/Protocols/StudyInformation";
import EligibilityCriteria from "./pages/Protocols/EligibilityCriteria";
import SitesLink from "./pages/Protocols/SitesLink";
import Documents from "./pages/Protocols/Documents";
import SitesLinkMain from "./pages/Protocols/SitesLink/SitesLinkMain";
import SiteInfo from "./pages/Protocols/SitesLink/SiteInfo";
import Schedule from "./pages/Protocols/StudyInformation/Schedule";
import GeneralInfo from "./pages/Protocols/StudyInformation/GeneralInfo";
import Inclusion from "./pages/Protocols/EligibilityCriteria/Inclusion";
import EditTreatments from "./pages/Protocols/StudyInformation/Schedule/EditTreatments";
import ScheduleMain from "./pages/Protocols/StudyInformation/Schedule/ScheduleMain";
import Exclusion from "./pages/Protocols/EligibilityCriteria/Exclusion";

// SITES
import Sites from "./pages/Sites";
import SitesMain from "./pages/Sites/SitesMain";

// USERS
import Users from "./pages/Users";
import UsersMain from "./pages/Users/UsersMain";

function App() {
  const { user } = useAuthContext();

  const loginRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <NotFound />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <NotFound />,
      element: <Layout />,
      children: [
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
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={user ? router : loginRouter} />
    </>
  );
}

export default App;
