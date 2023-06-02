import { ChatBubbleOvalLeftIcon, PhoneIcon } from "@heroicons/react/24/solid";
import colorPalette from "src/utils/styles/colorPalette";
import { useNavigate, useParams } from "react-router-dom";

function StaffItem(props) {
  const { data } = props;

  const { sponsorId } = useParams();

  const navigate = useNavigate();

  function handleClick() {
    navigate(`${data.id}`);
  }

  return (
    <div
      className={`has-transition flex items-center border py-2 px-4 rounded-full gap-2 w-[350px] mb-2 shadow-md cursor-pointer hover:border-primary ${
        sponsorId == data.id ? "border-primary" : "border-gray-200"
      }`}
      onClick={handleClick}
    >
      <img
        src="https://t4.ftcdn.net/jpg/02/99/97/35/360_F_299973520_rgAKO2BdhNhDArSSm7ikCT03qBCYcumJ.jpg"
        alt=""
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex-1">
        <h4 className="text-primary text-sm font-medium flex-1">{data.name}</h4>
        <p className="text-xs text-gray">Medical Monitor</p>
      </div>

      {/* <div className="w-8 h-8 bg-gray-200 grid place-items-center rounded-full cursor-pointer">
        <PhoneIcon
          width={16}
          height={16}
          color={colorPalette.SECONDARY_COLOR}
        />
      </div> */}
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

export default StaffItem;

import PropTypes from "prop-types";

StaffItem.propTypes = {
  data: PropTypes.object,
};
