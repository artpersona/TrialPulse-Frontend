import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  ClipboardDocumentIcon,
  UserGroupIcon,
  Battery50Icon,
  StarIcon,
  PencilSquareIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import colorPalette from "src/utils/styles/colorPalette";
import AvatarContainer from "../../AvatarContainer/AvatarContainer";

function ProtocolItem(props) {
  const { data } = props;

  const navigate = useNavigate();

  function handleClick() {
    navigate(`details/${data.id}`);
  }

  return (
    <div
      className="card has-transition p-4 relative mb-4 w-[450px] cursor-pointer hover:border-primary"
      onClick={handleClick}
    >
      <div className="flex items-cente4r justify-between mb-2">
        <div className="flex items-center gap-2">
          <AvatarContainer Icon={ClipboardDocumentIcon} />
          <div>
            <h4 className="text-primary font-medium">{data.title}</h4>
            <p className="text-xs text-gray italic">Last viewed August 4</p>
          </div>
        </div>
        <div className="bg-gray-light w-10 h-10 grid place-items-center rounded-full">
          <StarIcon className="h-6 w-6 text-gray-dark" />
        </div>
      </div>

      <div className="study__content">
        <p className="text-xs">{data.studyInfo}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="study__bottomUsers"
            style={{ backgroundColor: colorPalette.GRAY_LIGHT }}
          >
            <UserGroupIcon
              width={15}
              height={15}
              color={colorPalette.PRIMARY_COLOR_LIGHT}
            />
            <p>15</p>
          </div>
          <div
            className="study__bottomUsers"
            style={{ backgroundColor: colorPalette.GRAY_LIGHT }}
          >
            <Battery50Icon
              width={15}
              height={15}
              color={colorPalette.PRIMARY_COLOR_LIGHT}
            />
            <p>In-Progress</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <PencilSquareIcon className="w-5 h-5 text-secondary cursor-pointer" />
          <XCircleIcon className="w-5 h-5 text-red-600 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default ProtocolItem;

ProtocolItem.propTypes = {
  data: PropTypes.object,
};
