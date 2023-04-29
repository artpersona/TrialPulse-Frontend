import Study from "src/components/Protocols/Study";
import "./ProtocolsMain.styles.css";
import colorPalette from "src/utils/styles/colorPalette";

const getLetters = () => {
  let letters = [];
  for (let i = 65; i <= 90; i++) {
    letters.push(String.fromCharCode(i));
  }
  return letters;
};
function ProtocolsMain() {
  return (
    <div className="protocols">
      {/* SIDEBAR */}
      <div className="protocols__sidebar">
        {/* STUDIES LIST */}
        <div className="protocols__sidebarLists">
          <Study title="Clinic Study" />
          <Study title="Clinic Study" />
          <Study title="Clinic Study" />
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
