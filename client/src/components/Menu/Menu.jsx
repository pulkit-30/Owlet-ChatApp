import React from "react";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Menu.module.css";
function Menu(props) {
  return (
    <Flex
      className={Classes.Menu}
      style={{ display: props.show ? "flex" : "none" }}
    >
      {props.children}
    </Flex>
  );
}

export default Menu;
