import React, { useEffect, useRef } from "react";
import { format } from "timeago.js";
import Flex from "../../../Ui/Flex/Flex";
import PorfilePicture from "../../../ProfilePicture/ProfilePicture";
function Message(props) {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, []);
  return (
    <React.Fragment>
      <Flex
        style={{
          float: props.user ? "right" : "left",
          clear: "both",
          margin: "20px 10px",
          flexDirection: props.user ? "row" : "row-reverse",
        }}
      >
        <div
          style={{
            backgroundColor: props.user ? "white" : "black",
            width: "fir-content",
            padding: "14px 20px",
            color: props.user ? "black" : "white",
            borderRadius: "30px",
            maxWidth: "500px",
            minWidth: "120px",
            overflow: "hidden",
            wordWrap: "break-word",
            textAlign: props.user ? "left" : "right",
          }}
          ref={scrollRef}
        >
          {props.message}
          <p
            style={{
              opacity: "0.4",
              fontSize: "10px",
              marginTop: "10px",
              width: "100%",
              textAlign: props.user ? "right" : "left",
            }}
          >
            {format(props.time)}
          </p>
        </div>

        <div style={{ margin: "0px 10px" }}>
          <PorfilePicture
            style={{ width: "40px", height: "40px" }}
            src={"default.png"}
          />
        </div>
      </Flex>
    </React.Fragment>
  );
}

export default Message;
