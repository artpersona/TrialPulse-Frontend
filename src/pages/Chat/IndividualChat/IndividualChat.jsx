import { useState, useRef } from "react";
import { MessageList, Input, Button } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import "./IndividualChat.style.css";
import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";
import { useLocation, useParams } from "react-router-dom";
import useIndividualChatData from "./hooks/useIndividualChatData";
function ChatLanding() {
  const { messages, onSend } = useIndividualChatData();
  const inputRef = useRef(null);
  const [inputText, setInputText] = useState("");
  // const [messages, setMessages] = useState([
  //   {
  //     position: "left",
  //     type: "text",
  //     text: "Hello!",
  //     time: new Date(),
  //   },
  //   {
  //     position: "right",
  //     type: "text",
  //     text: "Hi there!",
  //     time: new Date(),
  //   },
  //   {
  //     position: "left",
  //     type: "text",
  //     text: "How are you?",
  //     time: new Date(),
  //   },
  // ]);

  const handleSendMessage = (newMessage) => {
    if (newMessage === "") return;

    onSend(newMessage);
    setInputText("");
  };

  return (
    <>
      <BlackNavbar />
      <div
        style={{
          width: "100%",
          height: window.innerHeight - 150,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
          marginTop: -40,
          paddingTop: 40,
        }}
      >
        <div
          style={{
            flex: 1,
            width: "95%",
            alignSelf: "center",
          }}
        >
          <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={messages.map((message) => ({
              ...message,
              position: message.position === "right" ? "right" : "left",
              date: message.time, // Add the date property for displaying the time
            }))}
          />
        </div>
        <div style={{ marginTop: "auto" }} className="input-container">
          <Input
            ref={inputRef}
            placeholder="Type your message..."
            multiline={true}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            onSubmit={() => {
              handleSendMessage(inputText);
            }}
            rightButtons={
              <Button
                color="white"
                backgroundColor="green"
                text="Send"
                onClick={() => {
                  handleSendMessage(inputText);
                }}
                className="send-button"
              />
            }
          />
        </div>
      </div>
    </>
  );
}

export default ChatLanding;
