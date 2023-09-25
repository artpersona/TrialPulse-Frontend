import "./AlertItem.styles.css";
import {
  BuildingOfficeIcon,
  ChatBubbleOvalLeftIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import AvatarContainer from "../../AvatarContainer/AvatarContainer";
import colorPalette from "src/utils/styles/colorPalette";

function AlertItem(props) {
  const { data, noClick } = props;

  const { alertId } = useParams();
  const navigate = useNavigate();

  function handleClick() {
    navigate(`${data.id}`);
  }

  const isActive = () => alertId == data.id;

  return (
    <div
      className={`flex items-center border py-2 px-4 rounded-full gap-2 w-[350px] mb-2 shadow-md cursor-pointer hover:border-primary ${
        alertId == data.id ? "border-primary" : "border-gray-300"
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
          {data.message}
        </h4>
      </section>
    </div>
  );
}

export default AlertItem;

import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";

AlertItem.propTypes = {
  data: PropTypes.object,
};
