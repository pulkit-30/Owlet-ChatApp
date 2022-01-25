import React from "react";
import Flex from "../Ui/Flex/Flex";
import Classes from "./CardLoader.module.css";
function CardLoader() {
  return (
    <Flex className={Classes.CardLoaderBox}>
      <div className={Classes.Image}></div>
      <div className={Classes.Name}></div>
    </Flex>
  );
}

export default CardLoader;
