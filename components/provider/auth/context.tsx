import { createContext } from "react";

export interface AuthContextType {
  token: string;
}

const AuthContext = createContext<AuthContextType>({ token: "" });

export default AuthContext;
