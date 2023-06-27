import "./TopNavbar.styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Squares2X2Icon,
  TagIcon,
  DocumentIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ShieldExclamationIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  InboxStackIcon,
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import colorPalette from "src/utils/styles/colorPalette.js";
import adminNav from "../../../shared/navbar/adminNav";
import sponsorAdminNav from "../../../shared/navbar/sponsorAdminNav";
import { useAuthContext } from "../../../contexts/AuthContext";

// const routes = [
//   {
//     id: "Home",
//     icon: Squares2X2Icon,
//     path: "",
//   },
//   {
//     id: "Sponsors",
//     icon: TagIcon,
//     path: "sponsors",
//   },
//   {
//     id: "Protocols",
//     icon: DocumentIcon,
//     path: "protocols",
//   },
//   {
//     id: "Sites",
//     icon: BuildingOfficeIcon,
//     path: "sites",
//   },
//   {
//     id: "Users",
//     icon: UserGroupIcon,
//     path: "users",
//   },
//   {
//     id: "Alerts",
//     icon: ShieldExclamationIcon,
//     path: "alerts",
//   },
//   {
//     id: "Chat",
//     icon: ChatBubbleOvalLeftEllipsisIcon,
//     path: "chat",
//   },
//   {
//     id: "Ads",
//     icon: InboxStackIcon,
//     path: "ads",
//   },
// ];

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

  const getNav = () => (userDetails.roleId === 4 ? sponsorAdminNav : adminNav);

  return (
    <div
      className="topNavbar"
      style={{ backgroundColor: colorPalette.GRAY_LIGHT }}
    >
      <nav>
        {/* LEFT */}
        <div>
          <ul>
            {getNav().map((item) => (
              <li
                key={"topNavbar" + item.id}
                className={
                  isActive(item.path)
                    ? "topNavbar__link__active"
                    : "topNavbar__link"
                }
                onClick={() => handleNavigate(item.path)}
              >
                <item.icon
                  height={28}
                  width={28}
                  color={
                    isActive(item.path)
                      ? colorPalette.PRIMARY_COLOR
                      : colorPalette.GRAY
                  }
                />
                <p
                  style={{
                    color: `${
                      isActive(item.path)
                        ? colorPalette.PRIMARY_COLOR
                        : colorPalette.GRAY
                    }`,
                  }}
                >
                  {item.id}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="topNavbar__right">
          {/* SEARCH */}
          <div className="topNavbar__search">
            <input placeholder="Search protocols" />
            <MagnifyingGlassIcon
              width={25}
              height={25}
              color={colorPalette.GRAY}
            />
          </div>

          <div className="topNavbar__more">
            <EllipsisHorizontalIcon
              width={25}
              height={25}
              color={colorPalette.GRAY}
            />
            <p>More</p>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default TopNavbar;
