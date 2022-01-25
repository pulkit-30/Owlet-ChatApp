import React, { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import Menu from "../../Menu/Menu";
import Flex from "../../Ui/Flex/Flex";
import Header from "../Header/Header";
import Classes from "./ChatArea.module.css";
import Chats from "./Chats/Chats";
import Form from "./Form/Form";

function ChatArea(props) {
  const [show, setShow] = useState(false);
  const { Request, ResponseData } = useApi();
  const [Messages, updateMessages] = useState([]);
  // const Auth = useContext(AuthContext);
  useEffect(() => {
    Request(
      "message/" + props.ConversationId,
      "GET",
      {},
      { "Content-type": "application/json" }
    );
  }, []);
  useEffect(() => {
    if (ResponseData.length !== 0) {
      updateMessages(ResponseData);
    }
  }, [ResponseData]);
  useEffect(() => {
    if (Messages.length !== 0) {
      localStorage.setItem("Messages", JSON.stringify(Messages));
    }
  }, [Messages]);

  const updateArrivels = (data) => {
    updateMessages([...JSON.parse(localStorage.getItem("Messages")), data]);
  };
  const ShowMenu = (is) => {
    setShow(is);
  };
  const ClearConversation = () => {
    Request(
      "conversation/" + props.ConversationId,
      "DELETE",
      {},
      { "Content-type": "application/json" }
    );
    updateMessages([]);
    localStorage.removeItem("Messages");
  };
  return (
    <Flex className={Classes.ChatAreaBox}>
      <div className={Classes.Header}>
        <Header
          ShowMenu={ShowMenu}
          show={show}
          Name={props.receiverNamew}
          Image="default.png"
        />
        <Menu show={show}>
          <div onClick={ClearConversation}>Clear Conversation</div>
        </Menu>
      </div>
      <div className={Classes.Chats}>
        {Messages.length !== 0 && <Chats Messages={Messages} />}
      </div>
      <div className={Classes.MessageForm}>
        <Form
          conversationId={props.ConversationId}
          receiver={props.receiver}
          updateArrivels={updateArrivels}
        />
      </div>
    </Flex>
  );
}

export default ChatArea;
