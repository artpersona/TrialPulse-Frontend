import "./TopNavbar.styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import colorPalette from "src/utils/styles/colorPalette.js";
import adminNav from "../../../shared/navbar/adminNav";
import sponsorAdminNav from "../../../shared/navbar/sponsorAdminNav";
import { useAuthContext } from "../../../contexts/AuthContext";
import logo from "src/assets/images/logo-yellow.jpeg";

function TopNavbar() {
  const { userDetails } = useAuthContext();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return pathname.split("/")[1] === path;
  };

  function handleNavigate(path) {
    navigate(`/${path}`);
  }

  const sponsorStaffNav = sponsorAdminNav.filter((item) => item.id !== "Users");

  const getNav = () =>
    userDetails.roleId === 3
      ? sponsorStaffNav
      : userDetails.roleId === 4
      ? sponsorAdminNav
      : adminNav;

  //     width: 100vw;
  // position: fixed;
  // top: 0;
  // left: 0;
  // padding: 0 20px;
  // height: 80px;
  // display: flex;
  // align-items: center;
  // z-index: 999;

  return (
    <div
      className="fixed w-screen top-0 left-0 px-5 h-[80px] flex items-center z-40 border-b  "
      style={{ backgroundColor: "#ffffff" }}
    >
      <nav className="mx-auto w-full flex justify-between items-center">
        {/* LEFT */}
        <div>
          <div className="flex items-center gap-14">
            <div className="flex flex-col items-center">
              <img src={logo} className="w-12 h-12 object-contain" alt="" />
              {/* <h1 className="text-xs opacity-80 text-gray-800">Trial Pulse</h1> */}
            </div>
            <ul className="flex space-x-6">
              {getNav().map((item) => (
                <li
                  key={"topNavbar" + item.id}
                  className="group w-12 list-none flex flex-col items-center cursor-pointer"
                  // className={
                  //   isActive(item.path)
                  //     ? "topNavbar__link__active"
                  //     : "topNavbar__link"
                  // }
                  onClick={() => handleNavigate(item.path)}
                >
                  <item.icon
                    className={`has-transition h-7 w-7 ${
                      isActive(item.path)
                        ? "text-primary"
                        : "text-gray opacity-80"
                    }`}
                  />
                  <p
                    className={`has-transition text-xs ${
                      isActive(item.path)
                        ? "text-primary font-medium"
                        : "text-gray opacity-80 font-light"
                    }`}
                    // style={{
                    //   color: `${
                    //     isActive(item.path)
                    //       ? colorPalette.PRIMARY_COLOR
                    //       : colorPalette.GRAY
                    //   }`,
                    // }}
                  >
                    {item.id}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT */}
        <div className="topNavbar__right">
          {/* SEARCH */}

          <div className="w-80 bg-gray-100 border border-gray-300 flex rounded-full py-1.5 px-3">
            <input
              className="outline-none border-none bg-transparent flex-1"
              placeholder="Search protocols"
            />
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
          </div>

          {/* <div className="topNavbar__more">
            <EllipsisHorizontalIcon
              width={25}
              height={25}
              color={colorPalette.GRAY}
            />
            <p>More</p>
          </div> */}

          <p
            key={"topNavbarLogout"}
            className="topNavbar__link__active flex flex-col items-center cursor-pointer"
            onClick={() => {
              localStorage.removeItem("user-details");
              localStorage.removeItem("token");
              localStorage.removeItem("user");

              window.location.href = "/";
            }}
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6 text-primary" />
            <p
              style={{
                color: colorPalette.PRIMARY_COLOR,
              }}
            >
              Logout
            </p>
          </p>
        </div>
      </nav>
    </div>
  );
}

export default TopNavbar;
