import { createContext, useContext } from "react";
import { useFirebaseContext } from "./FirebaseContext";
import { useAuthContext } from "./AuthContext";
import { push, ref, update } from "firebase/database";
export const MessagingContext = createContext();

export const MessagingProvider = ({ children }) => {
  // const navigate = useNavigate();
  const { userDetails } = useAuthContext();
  const { database } = useFirebaseContext();

  const onAddFriend = async (selectedUser) => {
    try {
      if (
        userDetails.friends &&
        Object.values(userDetails.friends).findIndex(
          (f) => f.id === selectedUser.id
        ) > 0
      ) {
        return;
      }

      const newChatroomRef = await push(ref(database, "chatrooms"), {
        firstUser: userDetails.id,
        secondUser: selectedUser.userId,
        messages: [],
      });

      const newChatroomId = newChatroomRef.key;
      console.log("newChatroomId", newChatroomId);

      // //join myself to this user friend list
      update(
        ref(
          database,
          `users/${selectedUser.userId}/friends/${userDetails?.id}`
        ),
        {
          id: userDetails.id,
          name: "Admin",
          chatroomId: newChatroomId,
        }
      );

      // //add this user to my friend list

      await update(
        ref(
          database,
          `users/${userDetails.id}/friends/${selectedUser?.userId}`
        ),
        {
          id: selectedUser.userId,
          name: `${selectedUser.firstName} ${selectedUser.lastName}`,
          //   avatar: user.avatar,
          chatroomId: newChatroomId,
        }
      );

      return {
        id: selectedUser.userId,
        name: `${selectedUser.firstName} ${selectedUser.lastName}`,
        chatroomId: newChatroomId,
      };
    } catch (error) {
      console.error(error);
    }
  };

  const onMessagePress = async (selectedUser) => {
    if (userDetails && userDetails.friends) {
      const isFriend = userDetails.friends[selectedUser.id];
      if (isFriend) {
        // navigate(`chat:${selectedUser.id}`, { selectedUser: isFriend });
      } else {
        let newFriend = await onAddFriend(selectedUser);
        // navigate(`chat:${selectedUser.id}`, { selectedUser: newFriend });
      }
    } else {
      await onAddFriend(selectedUser);
      let newFriend = await onAddFriend(selectedUser);
      // navigate(`chat:${selectedUser.id}`, { selectedUser: newFriend });
    }
  };

  const payload = { onMessagePress, onAddFriend };
  return (
    <MessagingContext.Provider value={payload}>
      {children}
    </MessagingContext.Provider>
  );
};

export const useMessagingContext = () => useContext(MessagingContext);

import PropTypes from "prop-types";

MessagingProvider.propTypes = {
  children: PropTypes.element,
};
