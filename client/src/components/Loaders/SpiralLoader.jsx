import React from "react";
import Flex from "../Ui/Flex/Flex";
import "./SpiralLoader.css";
function SpiralLoader() {
  return (
    <Flex>
      <div
        className="reverse-spinner"
        style={{ width: "50px", height: "50px" }}
      ></div>
    </Flex>
  );
}

export default SpiralLoader;
