import "./SiteItem.styles.css";
import {
  BuildingOfficeIcon,
  ChatBubbleOvalLeftIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import AvatarContainer from "../../AvatarContainer/AvatarContainer";
import colorPalette from "src/utils/styles/colorPalette";

function SiteItem(props) {
  const { data } = props;

  const { siteId } = useParams();

  function handleClick() {}

  return (
    <div
      className={`flex items-center border py-2 px-4 rounded-full gap-2 w-[350px] mb-2 shadow-md cursor-pointer hover:border-primary ${
        siteId == data.id ? "border-primary" : "border-gray-200"
      }`}
      onClick={handleClick}
    >
      <AvatarContainer Icon={BuildingOfficeIcon} />

      <h4 className="text-primary text-sm font-medium flex-1">{data.name}</h4>

      <div className="w-8 h-8 bg-gray-200 grid place-items-center rounded-full cursor-pointer">
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
      </div>
    </div>
  );
}

export default SiteItem;

import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

SiteItem.propTypes = {
  data: PropTypes.object,
};
