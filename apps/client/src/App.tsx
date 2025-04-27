import { FC, useContext } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Welcome from "./pages/Welcome";
import { AuthContext } from "./context/AuthContext";

const App: FC = () => {
  const { token } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/welcome"
          element={token ? <Welcome /> : <Navigate to="/signIn" />}
        />
        <Route path="/" element={<Navigate to="/welcome" />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
