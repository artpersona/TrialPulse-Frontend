import PropTypes from "prop-types";
import { useState } from "react";
import colorPalette from "src/utils/styles/colorPalette";
import "./Sidebar.styles.css";
import { SIDEBAR_WIDTH } from "../../shared/constants";

const getLetters = () => {
  let letters = [];
  for (let i = 65; i <= 90; i++) {
    letters.push(String.fromCharCode(i));
  }
  return letters;
};

const tabs = [
  {
    id: 0,
    label: "ABC",
  },
  {
    id: 1,
    label: "Recently Viewed",
  },
  {
    id: 2,
    label: "Last Updated",
  },
];

function Sidebar(props) {
  const { children } = props;

  const [currentTab, setCurrentTab] = useState(0);

  const isActive = (tab) => currentTab === tab;

  function handleClick(tab) {
    setCurrentTab(tab);
  }

  return (
    <div
      className={`fixed left-0 top-0 p-5 pt-[150px] w-[${SIDEBAR_WIDTH}px] border-1 border-black h-screen overflow-scroll`}
    >
      {/* TOP BAR */}
      <div
        className="sidebar__topBar"
        style={{ backgroundColor: colorPalette.GRAY_DARK }}
      >
        <nav className="sidebar__navbar">
          <ul>
            {tabs.map((item) => (
              <li
                className={isActive(item.id) ? "active" : "inactive"}
                key={item.id}
                onClick={() => handleClick(item.id)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {children}

      {/* LETTERS FILTER */}
      <div className="sidebar__filter">
        {getLetters().map((letter) => (
          <div
            key={letter}
            className="sidebar__filterItem"
            style={{ color: colorPalette.SECONDARY_COLOR }}
          >
            <p>{letter}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  children: PropTypes.element,
};
