import { createContext, useState, ReactNode, FC } from "react";
import axiosInstance from "../lib/axios";
interface AuthContextType {
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  signIn: async () => {},
  signOut: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    const response = await axiosInstance.post("/auth/signin", {
      email,
      password,
    });
    const { token } = response.data;
    console.log("Token received:", token);

    setToken(token);
  };

  const signOut = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
