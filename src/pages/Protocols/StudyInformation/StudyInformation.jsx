import "./StudyInformation.styles.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import colorPalette from "src/utils/styles/colorPalette";
import BlackNavbar from "src/components/Protocols/BlackNavbar";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const tabs = [
  {
    id: "general-info",
    label: "General Info",
    path: "",
  },
  {
    id: "schedule-of-activity",
    label: "Schedule of Activity",
    path: "schedule",
  },
  // {
  //   id: "table-of-contents",
  //   label: "Table of Contents",
  //   path: "table-of-contents",
  // },
];

function StudyInformation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const editPages = ["edit-treatments", "edit-general-info"];
	const currentPage = pathname.split("/").slice(-1)[0];
	const isEditPage = editPages.includes(currentPage);
  

  function handleNavigate(path) {
    navigate(path);
  }

  const isActive = (path) => {
    const currentPath = pathname.split("/").slice(-1)[0];
    if (
      path.length < 1 &&
      !tabs.map((item) => item.path).includes(currentPath)
    ) {
      return true;
    } else if (path === currentPath) {
      return true;
    }
  };

  return (
    <div className="w-full relative pr-8 pl-2">
      {isEditPage ? (
        <BlackNavbar>
          <div style={{ width: "100%", paddingLeft: 10 }}>
            <ChevronLeftIcon
              height={25}
              width={25}
              color={colorPalette.SECONDARY_COLOR}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
          </div>
        </BlackNavbar>
      ) : (
        <BlackNavbar>
          <nav className="studyInformation__navbar">
            <ul>
              {tabs.map((item) => (
                <li
                  className={isActive(item.path) ? "active" : "inactive"}
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </nav>
        </BlackNavbar>
      )}

      <div className="w-full mx-auto flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default StudyInformation;
