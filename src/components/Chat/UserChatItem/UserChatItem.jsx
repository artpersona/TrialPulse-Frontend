import "./UserChatItem.style.css";

import { BsFillCircleFill } from "react-icons/bs";

function UserItem(props) {
  const { data, noClick } = props;

  const { userId } = useParams();
  const navigate = useNavigate();

  function handleClick() {
    navigate(`${data.id}`, {
      state: { selectedUser: data },
    });
  }

  console.log("userId", userId);
  const isActive = () => userId == data.id;

  return (
    <div
      className={`has-transition flex items-center border py-2 px-4 rounded-full gap-2 w-[350px] mb-2 shadow-md cursor-pointer hover:border-primary ${
        userId == data.id ? "border-primary" : "border-gray-200"
      } ${isActive() ? "bg-primary" : "bg-white"} `}
      onClick={noClick ? () => null : handleClick}
    >
      <figure className="text-green relative">
        {/* {data.onlineStatus && ( */}
        <span className="absolute mt-0">
          <BsFillCircleFill className="text-xs" />
        </span>
        {/* )} */}
        {/* <AvatarContainer Icon={BuildingOfficeIcon} /> */}
        <img
          src="https://t4.ftcdn.net/jpg/02/99/97/35/360_F_299973520_rgAKO2BdhNhDArSSm7ikCT03qBCYcumJ.jpg"
          alt=""
          className="w-11 h-11 rounded-full object-cover"
        />
      </figure>

      <section className="flex-1 ml-2">
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
          } text-xs flex-1 capitalize`}
        >
          {data.position}
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

export default UserItem;

import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";

UserItem.propTypes = {
  data: PropTypes.object,
  noClick: PropTypes.bool,
};
