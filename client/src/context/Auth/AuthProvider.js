import React, { useEffect, useReducer } from "react";
import AuthContext from "./AuthContext";
const defaultState = {
  isUser: localStorage.getItem("isUser") || "false",
  User: JSON.parse(localStorage.getItem("User")) || null,
};
const HandelAction = (state, action) => {
  if (action.type === "LogIn") {
    return {
      isUser: true,
      User: action.User,
    };
  } else if (action.type === "LogOut") {
    return {
      isUser: "false",
      User: null,
    };
  } else if (action.type === "Update") {
    return {
      isUser: state.isUser,
      User: action.User,
    };
  }
  return defaultState;
};
function AuthProvider(props) {
  const [state, dispatch] = useReducer(HandelAction, defaultState);
  useEffect(() => {
    localStorage.setItem("isUser", state.isUser);
    localStorage.setItem("User", JSON.stringify(state.User));
  }, [state]);
  const LogIn = (User) => {
    dispatch({
      type: "LogIn",
      User: User,
    });
  };
  const LogOut = () => {
    dispatch({
      type: "LogOut",
    });
  };

  const UpdateUser = (User) => {
    dispatch({
      type: "Update",
      User: User,
    });
  };
  const StateValue = {
    isUser: state.isUser,
    User: state.User,
    LogIn: LogIn,
    LogOut: LogOut,
    UpdateUser: UpdateUser,
  };
  return (
    <AuthContext.Provider value={StateValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
