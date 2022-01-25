import React, { useState } from "react";
import Menu from "../../Menu/Menu";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import Flex from "../../Ui/Flex/Flex";
import Classes from "./Header.module.css";
function Header(props) {
  return (
    <Flex className={Classes.HeaderBox}>
      <Flex className={Classes.Header_left}>
        <ProfilePicture
          style={{ height: "50px", width: "50px" }}
          src={props.Image}
        />
        <div className={Classes.Name}>{props.Name}</div>
      </Flex>
      <Flex
        onClick={() => {
          if (props.show) {
            props.ShowMenu(false);
          } else {
            props.ShowMenu(true);
          }
        }}
      >
        <i className="fas fa-align-justify"></i>
      </Flex>
    </Flex>
  );
}

export default Header;
