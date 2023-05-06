import "./FloatingPlusButton.styles.css";
import { PlusIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

function FloatingPlusButton(props) {
  const { handleClick } = props;

  return (
    <div
      className="has-transition fixed bottom-12 right-12 w-14 h-14 rounded-full grid place-items-center cursor-pointer shadow-md border border-gray-light bg-secondary hover:bg-secondary-dark hover:scale-110"
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
