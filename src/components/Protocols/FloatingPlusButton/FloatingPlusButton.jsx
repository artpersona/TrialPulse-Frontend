import "./FloatingPlusButton.styles.css";
import { PlusIcon } from "@heroicons/react/24/solid";
import colorPalette from "src/utils/styles/colorPalette";
import PropTypes from "prop-types";

function FloatingPlusButton(props) {
  const { handleClick } = props;

  return (
    <div
      className="floatingPlusButton"
      style={{ backgroundColor: colorPalette.SECONDARY_COLOR }}
      onClick={handleClick}
    >
      <PlusIcon width={25} height={25} color="#FFFFFF" />
    </div>
  );
}

export default FloatingPlusButton;

FloatingPlusButton.propTypes = {
  handleClick: PropTypes.func,
};
