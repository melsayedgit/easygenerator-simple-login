import { FC } from "react";
import SignIn from "./pages/Signin";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // adjust the path

const App: FC = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        {/* <Route
          path="/welcome"
          element={true ? <WelcomePage /> : <Navigate to="/login" />}
        /> */}
        <Route path="/" element={<Navigate to="/welcome" />} />{" "}
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
