import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";

import NotFound from "./pages/Error/NotFound";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import AdminRoutes from "./routes/AdminRoutes";
import SponsorAdminRoutes from "./routes/SponsorAdminRoutes";

function App() {
  const { user, userDetails } = useAuthContext();

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

  function getUser() {
    if (!user) return loginRouter;
    if (userDetails.roleId === 4) return SponsorAdminRoutes;
    return AdminRoutes;
  }

  return (
    <>
      <RouterProvider router={getUser()} />
    </>
  );
}

export default App;
