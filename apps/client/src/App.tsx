import { FC } from "react";
import SignIn from "./pages/Signin";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
const App: FC = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<SignIn />} />
      {/* <Route
          path="/welcome"
          element={true ? <WelcomePage /> : <Navigate to="/login" />}
        /> */}
      <Route path="/" element={<Navigate to="/welcome" />} />{" "}
    </Routes>
  </Router>
);

export default App;
