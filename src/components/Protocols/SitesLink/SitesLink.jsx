import PropTypes from "prop-types";
import "./SitesLink.styles.css";
import { useNavigate } from "react-router-dom";
import {
  UserGroupIcon,
  ExclamationCircleIcon,
  ChevronRightIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/solid";
import colorPalette from "src/utils/styles/colorPalette";

function SitesLink(props) {
  const { data } = props;

  const navigate = useNavigate();

  function handleClick() {
    navigate(`${data.id}/info`);
  }

  return (
    <div className="sitesLink" onClick={handleClick}>
      <ChevronRightIcon
        className="sitesLink__arrowRight"
        color={colorPalette.SECONDARY_COLOR}
      />
      <div className="sitesLink__top">
        <div
          className="sitesLink__topIcon"
          style={{ backgroundColor: colorPalette.GRAY }}
        >
          <BuildingOfficeIcon width={20} height={20} color="white" />
        </div>
        <h4 style={{ color: colorPalette.PRIMARY_COLOR }}>{data.name}</h4>
      </div>
      <div className="sitesLink__bottom">
        <div
          className="sitesLink__bottomUsers"
          style={{ backgroundColor: colorPalette.GRAY_LIGHT }}
        >
          <UserGroupIcon
            width={20}
            height={20}
            color={colorPalette.PRIMARY_COLOR_LIGHT}
          />
          <p>20</p>
        </div>
        <ExclamationCircleIcon
          width={25}
          height={25}
          color={colorPalette.SECONDARY_COLOR}
        />
      </div>
    </div>
  );
}

export default SitesLink;

SitesLink.propTypes = {
  data: PropTypes.object,
};
