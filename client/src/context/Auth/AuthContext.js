import React from "react";
const AuthContext = React.createContext({
  isUser: false,
  User: null,
  LogIn: (User) => {},
  LogOut: () => {},
  UpdateUser: (User) => {},
});
export default AuthContext;
