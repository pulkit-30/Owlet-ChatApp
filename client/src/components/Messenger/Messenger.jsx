import React, { useState } from "react";
import Classes from "./Messenger.module.css";
import Flex from "../Ui/Flex/Flex";
import Conversation from "./Conversation/Conversation";
import ChatArea from "./ChatArea/ChatArea";
import SpiralLoader from "../Loaders/SpiralLoader";
function Messenger() {
  const [Show, setShow] = useState(false);
  const [ConversationId, updateConversationId] = useState(null);
  const [Receiver, setReceiver] = useState(undefined);

  const ShowChatArea = (id, receiver) => {
    updateConversationId(id);
    setReceiver(receiver);
    setShow(true);
  };

  return (
    <Flex className={Classes.MessengerBox}>
      <Conversation ShowChatArea={ShowChatArea} />
      {!Show && (
        <h1
          style={{
            opacity: 0.3,
            width: "70%",
            textAlign: "center",
            fontSize: "50px",
          }}
        >
          owlet <i className="fas fa-comment"></i>
        </h1>
      )}
      {Show && <ChatArea ConversationId={ConversationId} receiver={Receiver} />}
    </Flex>
  );
}

export default Messenger;
