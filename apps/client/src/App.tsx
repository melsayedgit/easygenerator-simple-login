import { FC } from "react";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./pages/Signin";
import "./App.css";
const App: FC = () => (
  <AuthProvider>
    <SignIn />
  </AuthProvider>
);

export default App;
