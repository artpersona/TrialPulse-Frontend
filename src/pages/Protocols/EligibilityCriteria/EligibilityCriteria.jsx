import "./EligibilityCriteria.styles.css";
import BlackNavbar from "../../../components/Protocols/BlackNavbar/BlackNavbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const tabs = [
  {
    id: "inclusion",
    label: "Inclusion",
    path: "",
  },
  {
    id: "exclusion",
    label: "Exclusion",
    path: "exclusion",
  },
];

function EligibilityCriteria() {
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
        <nav className="eligibilityCriteria__navbar">
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

export default EligibilityCriteria;
