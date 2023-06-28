import {
  BuildingOfficeIcon,
  ChatBubbleOvalLeftIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import AvatarContainer from "../../AvatarContainer/AvatarContainer";
import colorPalette from "src/utils/styles/colorPalette";
import { useNavigate, useParams } from "react-router-dom";

function SponsorItem(props) {
  const { data } = props;

  const { sponsorId } = useParams();

  const navigate = useNavigate();

  function handleClick() {
    navigate(`${data.id}`);
  }

  const isActive = () => sponsorId == data.id;
  return (
    <div
      className={`has-transition flex items-center border py-2 px-4 rounded-full gap-2 w-[350px] mb-2 shadow-md cursor-pointer hover:border-primary ${
        sponsorId == data.id ? "border-primary" : "border-gray-200"
      } ${isActive() ? "bg-primary" : "bg-white"}`}
      onClick={handleClick}
    >
      <AvatarContainer Icon={BuildingOfficeIcon} />

      <h4
        className={`${
          isActive() ? "text-white" : "text-primary"
        } text-sm font-medium flex-1 ml-2 capitalize`}
      >
        {data.name}
      </h4>

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

export default SponsorItem;

import PropTypes from "prop-types";

SponsorItem.propTypes = {
  data: PropTypes.object,
};
