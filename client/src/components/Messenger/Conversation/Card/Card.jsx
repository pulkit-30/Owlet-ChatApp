import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../context/Auth/AuthContext";
import useApi from "../../../../Hooks/useApi";
import CardLoader from "../../../Loaders/CardLoader";
import ProfilePicture from "../../../ProfilePicture/ProfilePicture";
import Flex from "../../../Ui/Flex/Flex";
import Classes from "./Card.module.css";
function Card(props) {
  const { Request, ResponseData, isLoading } = useApi();
  const Auth = useContext(AuthContext);
  const [User, updateUser] = useState(null);
  const id =
    Auth.User._id === props.members[0] ? props.members[1] : props.members[0];
  useEffect(() => {
    Request(
      "user/?userId=" + id,
      "GET",
      {},
      { "Content-type": "application/json" }
    );
  }, []);
  useEffect(() => {
    if (ResponseData.length !== 0) {
      updateUser(ResponseData);
    }
  }, [ResponseData]);
  return (
    <Flex className={Classes.Card} onClick={props.onClick}>
      {isLoading && <CardLoader />}
      {User && (
        <React.Fragment>
          <Flex className={Classes.Card_left}>
            <ProfilePicture
              style={{ height: "40px", width: "40px" }}
              src={User.profilePicture}
            />
            <div>{User.name}</div>
          </Flex>
        </React.Fragment>
      )}
    </Flex>
  );
}

export default Card;
