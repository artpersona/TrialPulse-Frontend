import Study from "src/components/Protocols/Study";
import "./ProtocolsMain.styles.css";
import colorPalette from "src/utils/styles/colorPalette";
import { useState } from "react";
import { useProtocolContext } from "src/contexts/ProtocolContext";

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

function ProtocolsMain() {
  const { protocols } = useProtocolContext();

  const [currentTab, setCurrentTab] = useState(0);

  const isActive = (tab) => currentTab === tab;

  function handleClick(tab) {
    setCurrentTab(tab);
  }

  return (
    <div className="protocols">
      {/* SIDEBAR */}
      <div className="protocols__sidebar">
        {/* TOP BAR */}
        <div
          className="protocols__topBar"
          style={{ backgroundColor: colorPalette.GRAY_DARK }}
        >
          <nav className="protocols__navbar">
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
        {/* STUDIES LIST */}
        <div className="protocols__sidebarLists">
          {protocols.map((protocol) => (
            <Study data={protocol} key={protocol.id} />
          ))}
        </div>

        {/* LETTERS FILTER */}
        <div className="protocols__filter">
          {getLetters().map((letter) => (
            <div
              key={letter}
              className="protocols__filterItem"
              style={{ color: colorPalette.SECONDARY_COLOR }}
            >
              <p>{letter}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProtocolsMain;
