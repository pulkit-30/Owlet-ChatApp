import React from "react";
import Flex from "../Ui/Flex/Flex";
import Classes from "./ProfilePicture.module.css";
function ProfilePicture(props) {
  return (
    <Flex className={Classes.ProfilePicture} style={props.style}>
      <img
        src={
          props.src
            ? "http://localhost/" + props.src
            : "https://images.unsplash.com/photo-1642966124702-7efacb5066e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
        }
        alt="ProfilePicture"
        style={props.style}
      />
    </Flex>
  );
}

export default ProfilePicture;
