import "./SectionNavbar.styles.css";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

function SectionNavbar(props) {
  const { tabs } = props;

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
    <nav className="sectionNavbar">
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
  );
}

export default SectionNavbar;

SectionNavbar.propTypes = {
  tabs: PropTypes.array,
};
