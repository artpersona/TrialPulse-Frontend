import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import colorPalette from "src/utils/styles/colorPalette";
import "./Sidebar.styles.css";
import { SIDEBAR_WIDTH } from "../../shared/constants";
import { useSearchParams } from "react-router-dom";

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
  const { children, hideNavbar } = props;

  const [currentTab, setCurrentTab] = useState(0);

  const isActive = (tab) => currentTab === tab;

  function handleClick(tab) {
    setCurrentTab(tab);
  }

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    switch (currentTab) {
      case 0:
        searchParams.delete("sort");
        break;
      case 1:
        searchParams.set("sort", "last_viewed");
        break;
      case 2:
        searchParams.set("sort", "last_updated");
        break;
    }

    setSearchParams(searchParams);
  }, [currentTab, searchParams, setSearchParams]);

  // position: fixed;
  // height: 60px;
  // top: 80px;
  // left: 0;
  // width: 450px;
  // z-index: 999;
  // border-right: 1px solid white;
  // display: flex;
  // align-items: center;
  // padding-left: 20px;
  return (
    <div
      className={`fixed left-0 top-0 p-5 pt-[150px] w-[400px] shadow-md shadow-gray h-screen overflow-y-scroll bg-gray-background `}
    >
      {/* TOP BAR */}
      <div
        className={`fixed h-[60px] top-[80px] left-0 w-[400px] z-50 flex items-center border-r-2 border-white`}
        style={{ backgroundColor: colorPalette.GRAY_DARK }}
      >
        {hideNavbar ? null : (
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
        )}
      </div>

      {children}

      {/* LETTERS FILTER */}
      {/* <div className="sidebar__filter">
        {getLetters().map((letter) => (
          <div
            key={letter}
            className="sidebar__filterItem"
            style={{ color: colorPalette.SECONDARY_COLOR }}
          >
            <p>{letter}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  children: PropTypes.element,
  hideNavbar: PropTypes.bool,
};
