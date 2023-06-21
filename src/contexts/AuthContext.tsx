import { ReactNode, createContext } from "react";
import useAuth from "../hooks/useAuth";
import { User } from "firebase/auth";

interface AuthProviderPropsType {
  children: ReactNode;
}

export interface AuthContextType {
  currentUser: User | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderPropsType) => {
  const { currentUser } = useAuth();

  const AuthValues = {
    currentUser,
  };
  return (
    <AuthContext.Provider value={AuthValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
