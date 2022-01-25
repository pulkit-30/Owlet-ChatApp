import React, { useContext } from "react";
import AuthContext from "../../../../context/Auth/AuthContext";
import Message from "../Message/Message";

function Chats(props) {
  const Auth = useContext(AuthContext);
  return (
    <div style={{ overflowY: "auto", height: "100%" }}>
      {props.Messages.map((message, index) => {
        return (
          <Message
            user={Auth.User._id === message.sender}
            message={message.message}
            time={message.createdAt}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default Chats;
