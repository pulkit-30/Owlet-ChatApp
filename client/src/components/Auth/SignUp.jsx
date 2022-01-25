import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Auth/AuthContext";
import useApi from "../../Hooks/useApi";
import SpiralLoader from "../Loaders/SpiralLoader";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Auth.module.css";
function SignUp() {
  const { Request, isLoading, isError, ResponseData } = useApi();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const Auth = useContext(AuthContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    Request(
      "auth/register",
      "POST",
      {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      },
      { "Content-type": "application/json" }
    );
  };
  useEffect(() => {
    if (ResponseData.length !== 0) {
      Auth.LogIn(ResponseData);
    }
  }, [ResponseData]);
  return (
    <form onSubmit={handleSubmit}>
      <Flex className={Classes.Form}>
        <input type="text" name="name" placeholder="Name" ref={name}></input>
        <input
          type="email"
          name="email"
          placeholder="Email"
          ref={email}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          ref={password}
        ></input>
        <div className="box">
          {isLoading && <SpiralLoader />}
          {!isLoading && <button type="submit"> Register</button>}
        </div>
        <p>
          Already have an Account{" "}
          <Link to="/" className="link">
            LogIn here
          </Link>
        </p>
      </Flex>
    </form>
  );
}

export default SignUp;
