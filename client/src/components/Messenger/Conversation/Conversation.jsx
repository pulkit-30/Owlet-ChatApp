import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../context/Auth/AuthContext";
import useApi from "../../../Hooks/useApi";
import useSearch from "../../../Hooks/useSearch";
import Menu from "../../Menu/Menu";
import Flex from "../../Ui/Flex/Flex";
import Header from "../Header/Header";
import Card from "./Card/Card";
import Classes from "./Conversation.module.css";
function Conversation(props) {
  const [show, setShow] = useState(false);
  const { Request, ResponseData, isLoading } = useApi();
  const Auth = useContext(AuthContext);
  const [Conversations, updateConversations] = useState([]);
  const { Search, Results } = useSearch();
  const Searchref = useRef();
  useEffect(() => {
    Request(
      "conversation/" + Auth.User._id,
      "GET",
      {},
      {
        "Content-type": "application/json",
      }
    );
  }, []);
  useEffect(() => {
    if (ResponseData && ResponseData.length !== 0) {
      updateConversations(ResponseData);
    }
  }, [ResponseData]);

  useEffect(() => {
    console.log(Results);
  }, [Results]);
  const ShowMenu = (is) => {
    setShow(is);
  };
  return (
    <Flex className={Classes.ConversationBox}>
      <div className={Classes.Header}>
        <Header
          Name={Auth.User.name}
          Image={Auth.User.profilePicture}
          ShowMenu={ShowMenu}
          show={show}
        />
        <Menu show={show}>
          <div>Profile</div>
          <div
            onClick={() => {
              Auth.LogOut();
            }}
          >
            LogOut
          </div>
        </Menu>
      </div>
      <form
        className={Classes.Form}
        onSubmit={(event) => {
          event.preventDefault();
          Search(Searchref.current.value);
        }}
      >
        <Flex className={Classes.SearchBox}>
          <input type="text" name="query" ref={Searchref} />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </Flex>
      </form>
      {Results.length !== 0 && (
        <div className={Classes.Results}>
          {Results.map((Conversation, index) => {
            return (
              <Card
                key={index}
                members={[Conversation._id]}
                id={Conversation._id}
                onClick={() => {
                  Request(
                    "conversation/newconversation",
                    "POST",
                    {
                      members: [Auth.User._id, Conversation._id],
                    },
                    { "Content-type": "application/json" }
                  );
                }}
              />
            );
          })}
        </div>
      )}
      <div className={Classes.Conversations}>
        {!isLoading &&
          Conversations.length !== 0 &&
          Conversations.map((Conversation, index) => {
            return (
              <Card
                key={index}
                members={Conversation.members}
                id={Conversation._id}
                onClick={() => {
                  props.ShowChatArea(
                    Conversation._id,
                    Conversation.members[0] === Auth.User._id
                      ? Conversation.members[1]
                      : Conversation.members[0]
                  );
                }}
              />
            );
          })}
      </div>
    </Flex>
  );
}

export default Conversation;
