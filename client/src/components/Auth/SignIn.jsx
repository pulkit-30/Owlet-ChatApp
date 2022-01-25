import React, { useContext, useEffect, useRef } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import useApi from "../../Hooks/useApi";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Auth.module.css";
import { Link } from "react-router-dom";
import SpiralLoader from "../Loaders/SpiralLoader";
function SignIn() {
  const Auth = useContext(AuthContext);
  const { Request, ResponseData, isLoading } = useApi();
  const email = useRef();
  const password = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    Request(
      "auth/login",
      "POST",
      {
        email: email.current.value,
        password: password.current.value,
      },
      { "Content-Type": "application/json" }
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
          {!isLoading && <button type="submit"> SignIn</button>}
        </div>
        <p>
          Dont't have an Account{" "}
          <Link to="/register" className="link">
            {" "}
            Create a new Account
          </Link>
        </p>
      </Flex>
    </form>
  );
}

export default SignIn;
