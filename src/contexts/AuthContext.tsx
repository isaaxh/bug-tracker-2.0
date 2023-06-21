import { ReactNode, createContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import { User } from "firebase/auth";

interface AuthProviderPropsType {
  children: ReactNode;
}

export interface AuthContextType {
  currentUser: User | null;
}

interface AuthValues {
  currentUser: User;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderPropsType) => {
  const { currentUser } = useAuth();

  let AuthValues: AuthValues | null = null;

  if (currentUser !== null) {
    AuthValues = {
      currentUser,
    };
  } else {
    console.log("Current User Unavailable");
  }

  return (
    <AuthContext.Provider value={AuthValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
