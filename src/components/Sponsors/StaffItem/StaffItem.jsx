import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import colorPalette from "src/utils/styles/colorPalette";
// import { useNavigate } from "react-router-dom";
import { useMessagingContext } from "../../../contexts/MessagingContext";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
function StaffItem(props) {
  const navigate = useNavigate();
  const { userDetails } = useAuthContext();
  const { onAddFriend } = useMessagingContext();
  const { data } = props;

  console.log("data is: ", data);
  // const { sponsorId } = useParams();

  // const navigate = useNavigate();

  // function handleClick() {
  //   navigate(`${data.userId}`);
  // }

  const onMessagePress = async (selectedUser) => {
    if (userDetails && userDetails.friends) {
      const isFriend = userDetails.friends[selectedUser.userId];
      if (isFriend) {
        navigate(`/chat/${selectedUser.userId}`, {
          state: { selectedUser: isFriend },
        });
      } else {
        let newFriend = await onAddFriend(selectedUser);
        navigate(`/chat/${selectedUser.userId}`, {
          state: { selectedUser: newFriend },
        });
      }
    } else {
      await onAddFriend(selectedUser);
      let newFriend = await onAddFriend(selectedUser);
      navigate(`/chat/${selectedUser.userId}`, {
        state: { selectedUser: newFriend },
      });
    }
  };

  return (
    <div
      className={`has-transition flex items-center border py-2 px-4 rounded-full gap-2 w-[350px] mb-2 shadow-md cursor-pointer hover:border-primary`}
      // onClick={handleClick}
    >
      <img
        src="https://t4.ftcdn.net/jpg/02/99/97/35/360_F_299973520_rgAKO2BdhNhDArSSm7ikCT03qBCYcumJ.jpg"
        alt=""
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex-1">
        <h4 className="text-primary text-sm font-medium flex-1 capitalize">
          {data.firstName} {data.lastName}
        </h4>
        <p className="text-xs text-gray">{data.position}</p>
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
          onClick={() => onMessagePress(data)}
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
