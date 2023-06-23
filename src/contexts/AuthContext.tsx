import { ReactNode, createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { User } from "firebase/auth";

interface AuthProviderPropsType {
  children: ReactNode;
}

export interface AuthContextType {
  currentUser: User | null;
  profileImg: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderPropsType) => {
  const { currentUser } = useAuth();
  const [profileImg, setProfileImg] = useState(
    "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
  );

  useEffect(() => {
    if (currentUser?.photoURL) {
      setProfileImg(currentUser.photoURL);
      return;
    }
    setProfileImg(
      "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
    );
  }, [currentUser]);

  const AuthValues = {
    currentUser,
    profileImg,
  };
  return (
    <AuthContext.Provider value={AuthValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
