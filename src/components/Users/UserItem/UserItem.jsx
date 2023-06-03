import "./UserItem.styles.css";
import {
	BuildingOfficeIcon,
	ChatBubbleOvalLeftIcon,
	PhoneIcon,
} from "@heroicons/react/24/solid";
import { BsFillCircleFill } from "react-icons/bs";

import AvatarContainer from "../../AvatarContainer/AvatarContainer";
import colorPalette from "src/utils/styles/colorPalette";

function UserItem(props) {
	const { data } = props;

	const { userId } = useParams();
	const navigate = useNavigate();

	function handleClick() {
		navigate(`${data.id}`);
	}

	return (
		<div
			className={`flex items-center border py-2 px-4 rounded-full gap-2 w-[350px] mb-2 shadow-md cursor-pointer hover:border-primary ${
				userId == data.id ? "border-primary" : "border-gray-200"
			}`}
			onClick={handleClick}
		>
			<figure className="text-green relative">
				{/* {data.onlineStatus && ( */}
				<span className="absolute mt-0">
					<BsFillCircleFill className="text-xs"/>
				</span>
				{/* )} */}
				<AvatarContainer Icon={BuildingOfficeIcon} />
			</figure>

			<section className="flex-1 ml-2">
				<h4 className="text-primary font-medium">{data.name}</h4>
				<p
					className={`text-sm`}
					style={{ color: colorPalette.GRAY }}
				>
					Medical Monitor
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
};
