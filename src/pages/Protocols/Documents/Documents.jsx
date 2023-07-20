import "./Documents.styles.css";
import BlackNavbar from "../../../components/Protocols/BlackNavbar/BlackNavbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const tabs = [
  {
    id: "pdf",
    label: "PDF",
    path: "",
  },
  {
    id: "images",
    label: "Images",
    path: "images",
  },
  {
    id: "videos",
    label: "Videos",
    path: "videos",
  },
];

function Documents() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
    <div>
      <BlackNavbar>
        <nav className="documents__navbar">
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
      <div>{<Outlet />}</div>
    </div>
  );
}

export default Documents;
