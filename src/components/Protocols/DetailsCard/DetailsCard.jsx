import "./DetailsCard.styles.css";
import { useLocation } from "react-router-dom";
import colorPalette from "src/utils/styles/colorPalette";

function DetailsCard(props) {
  const { title, description, image, onClick, path } = props;

  const { pathname } = useLocation();

  const isActive = () => {
    const currentPath = pathname.split("/").slice(1);
    if (currentPath.includes(path)) {
      return true;
    } else if (currentPath.length < 4 && path.length == 0) {
      return true;
    }
  };

  return (
    <div
      className={`card has-transition p-4 overflow-hidden w-[350px] relative bg-white my-4 cursor-pointer hover:border-primary ${
        isActive() && "border-primary border-2"
      }`}
      onClick={onClick}
    >
      <div className="detailsCard__content">
        <h3 className="text-xl font-medium">{title}</h3>
        <p>
          {description ||
            "Brief Overview of lorem ipsum hsahsax lassdjkt dfkdsfkdsk lsl Overview of lorem ipsum Overview of lorem ipsum"}
        </p>
      </div>
      <div className="detailsCard__imageContainer">
        <img src={image} alt="" className="detailsCard__image" />
      </div>
    </div>
  );
}

export default DetailsCard;

import PropTypes from "prop-types";

DetailsCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  onClick: PropTypes.func,
  path: PropTypes.string,
};
