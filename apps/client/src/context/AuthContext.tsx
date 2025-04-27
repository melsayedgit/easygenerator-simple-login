import { createContext, useState, ReactNode, FC } from "react";
import axios from "../lib/axios"; // Adjust the import path as necessary
interface AuthContextType {
  user: string | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  signIn: async () => {},
  signOut: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/signin", {
        email,
        password,
      });
      const { token, user } = response.data;
      setUser(user);
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
    } catch (error) {
      throw new Error(`Invalid email or password. ${error}`);
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
