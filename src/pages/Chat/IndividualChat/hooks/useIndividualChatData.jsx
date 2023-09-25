import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import {
  get,
  ref,
  update,
  onValue,
  off,
  push,
  serverTimestamp,
} from "firebase/database";
import { useFirebaseContext } from "../../../../contexts/FirebaseContext";
const useIndividualChatData = () => {
  const { state } = useLocation();
  const { database } = useFirebaseContext();
  const { userDetails } = useAuthContext();
  const [selectedUser, setSelectedUser] = useState(state?.selectedUser);
  const [messages, setMessages] = useState([]);

  console.log("messages are: ", messages);

  const fetchMessages = useCallback(async () => {
    const snapshot = await get(
      ref(database, `chatrooms/${selectedUser.chatroomId}`)
    );

    return snapshot.val();
  }, [selectedUser.chatroomId, database]);

  const renderMessages = useCallback(
    (msgs) => {
      return msgs
        ? Object.values(msgs).map((msg) => {
            return {
              position: msg.sender === userDetails.id ? "right" : "left",
              type: "text",
              text: msg.text,
              time: msg.createdAt,
            };
          })
        : [];
    },
    [userDetails.id]
  );

  const onSend = (msg) => {
    try {
      (async () => {
        push(ref(database, `chatrooms/${selectedUser.chatroomId}/messages`), {
          createdAt: serverTimestamp(),
          text: msg,
          sender: userDetails?.id,
        });

        update(
          ref(database, `users/${selectedUser.id}/friends/${userDetails.id}`),
          {
            lastMessage: msg,
            updatedAt: new Date(),
            lastSender: userDetails.id,
          }
        );

        //add this user to my friend list
        update(
          ref(database, `users/${userDetails.id}/friends/${selectedUser.id}`),
          {
            lastMessage: msg,
            updatedAt: new Date(),
            lastSender: userDetails.id,
          }
        );
      })();

      console.log("success");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //load old messages
    const loadData = async () => {
      const myChatroom = await fetchMessages();
      setMessages(renderMessages(myChatroom.messages));
    };

    loadData();

    // set chatroom change listener

    const chatroomRef = ref(database, `chatrooms/${selectedUser.chatroomId}`);
    onValue(chatroomRef, (snapshot) => {
      const data = snapshot.val();
      setMessages(renderMessages(data.messages));
    });

    return () => {
      //remove chatroom listener
      off(chatroomRef);
    };
  }, [fetchMessages, selectedUser.chatroomId]);

  useEffect(() => {
    if (state?.selectedUser) {
      setSelectedUser(state?.selectedUser);
    }
  }, [state?.selectedUser]);
  return {
    selectedUser,
    messages,
    onSend,
  };
};

export default useIndividualChatData;
