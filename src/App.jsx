import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Protocols from "./pages/Protocols";
import Overview from "./pages/Protocols/Overview";
import ProtocolsMain from "./pages/Protocols/ProtocolsMain/ProtocolsMain";
import Details from "./pages/Protocols/Details/Details";
import StudyInformation from "./pages/Protocols/StudyInformation/StudyInformation";
import EligibilityCriteria from "./pages/Protocols/EligibilityCriteria/EligibilityCriteria";
import SitesLink from "./pages/Protocols/SitesLink/SitesLink";
import Documents from "./pages/Protocols/Documents/Documents";
import SitesLinkMain from "./pages/Protocols/SitesLink/SitesLinkMain/SitesLinkMain";
import SiteInfo from "./pages/Protocols/SitesLink/SiteInfo/SiteInfo";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
