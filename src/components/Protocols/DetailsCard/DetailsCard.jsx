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
      className="detailsCard"
      onClick={onClick}
      style={{
        border: isActive()
          ? `3px solid ${colorPalette.PRIMARY_COLOR}`
          : "1px solid #000",
      }}
    >
      <div className="detailsCard__content">
        <h3>{title}</h3>
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
