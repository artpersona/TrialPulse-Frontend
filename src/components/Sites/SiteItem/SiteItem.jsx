import "./SiteItem.styles.css";
import {
  BuildingOfficeIcon,
  ChatBubbleOvalLeftIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import AvatarContainer from "../../AvatarContainer/AvatarContainer";
import colorPalette from "src/utils/styles/colorPalette";

function SiteItem(props) {
  const { data, noClick } = props;

  const { siteId } = useParams();
  const navigate = useNavigate();

  function handleClick() {
    navigate(`${data.id}`);
  }

  const isActive = () => siteId == data.id;

  return (
    <div
      className={`flex items-center border py-2 px-4 rounded-full gap-2 w-[350px] mb-2 shadow-md cursor-pointer hover:border-primary ${
        siteId == data.id ? "border-primary" : "border-gray-300"
      } ${isActive() ? "bg-primary" : "bg-white"}`}
      onClick={noClick ? () => null : handleClick}
    >
      <AvatarContainer Icon={BuildingOfficeIcon} />

      <section className="ml-2">
        <h4
          className={`${
            isActive() ? "text-white" : "text-primary"
          } text-sm font-medium flex-1 capitalize`}
        >
          {data.name}
        </h4>

        <p
          className={`${
            isActive() ? "text-gray-300" : "text-gray-dark"
          } text-xs flex-1`}
        >
          {data.contactEmail}
        </p>
      </section>

      {/* <div className="w-8 h-8 bg-gray-200 grid place-items-center rounded-full cursor-pointer">
        <PhoneIcon
          width={16}
          height={16}
          color={colorPalette.SECONDARY_COLOR}
        />
      </div>
      <div className="w-8 h-8 bg-gray-200 grid place-items-center rounded-full cursor-pointer">
        <ChatBubbleOvalLeftIcon
          width={16}
          height={16}
          color={colorPalette.SECONDARY_COLOR}
        />
      </div> */}
    </div>
  );
}

export default SiteItem;

import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";

SiteItem.propTypes = {
  data: PropTypes.object,
};
