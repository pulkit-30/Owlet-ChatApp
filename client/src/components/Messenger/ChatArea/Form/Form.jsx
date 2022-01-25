import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../../context/Auth/AuthContext";
import useApi from "../../../../Hooks/useApi";
import Flex from "../../../Ui/Flex/Flex";
import Classes from "./Form.module.css";
import { io } from "socket.io-client";

function Form(props) {
  const Auth = useContext(AuthContext);
  const { Request } = useApi();
  const message = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      props.updateArrivels({
        sender: data.senderId,
        message: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", Auth.User._id);
  }, [Auth.User]);

  const handelSubmit = (event) => {
    event.preventDefault();
    Request(
      "message/new",
      "POST",
      {
        conversationId: props.conversationId,
        sender: Auth.User._id,
        message: message.current.value,
      },
      { "Content-type": "application/json" }
    );
    props.updateArrivels({
      sender: Auth.User._id,
      message: message.current.value,
      createdAt: Date.now(),
    });
    socket.current.emit("sendMessage", {
      senderId: Auth.User._id,
      receiverId: props.receiver,
      text: message.current.value,
    });
    message.current.value = "";
  };
  return (
    <form className={Classes.FormContainer} onSubmit={handelSubmit}>
      <Flex className={Classes.Form}>
        <input type="text" placeholder="Message" ref={message} />
        <button>
          <i className="fas fa-paper-plane"></i>
        </button>
      </Flex>
    </form>
  );
}

export default Form;
