import "./BlackNavbar.styles.css";
import colorPalette from "src/utils/styles/colorPalette";

function BlackNavbar({ children }) {
  return (
    <div
      className="blackNavbar"
      style={{ backgroundColor: colorPalette.GRAY_DARK }}
    >
      {children}
    </div>
  );
}

export default BlackNavbar;
