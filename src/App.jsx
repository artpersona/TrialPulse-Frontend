import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
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
import Login from "./pages/Auth/Login";
import { useAuthContext } from "./contexts/AuthContext";
import NotFound from "./pages/Error/NotFound";
import Signup from "./pages/Auth/Signup";

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
              path: "details/:protocolsId",
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
                      element: <Schedule />,
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
