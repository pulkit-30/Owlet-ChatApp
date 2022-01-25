import "./App.css";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Messenger from "./components/Messenger/Messenger";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/Auth/AuthContext";
function App() {
  const Auth = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={Auth.User ? <Messenger /> : <SignIn />} />
        {!Auth.User && !Auth.User && (
          <Route path="/register" element={<SignUp />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
