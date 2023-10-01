import {
  ReactNode,
  FormEvent,
  createContext,
  useEffect,
  useState,
} from "react";
import { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import useFirestore from "../hooks/useFirestore";
import { DocumentData } from "firebase/firestore";
import Loader from "../components/common/Loader";

interface AuthProviderPropsType {
  children: ReactNode;
}

export interface AuthContextType {
  currentUser: User | null;
  currentUserData: DocumentData | undefined;
  signUp: ({ userData }: signUpProps) => Promise<void>;
  signIn: ({ e, email, password }: signInProps) => Promise<void>;
  signOut: () => void;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  profileImg: string;
  loading: boolean;
  userDataPending: boolean;
}

type signInProps = {
  e: FormEvent<HTMLFormElement>;
  email: string;
  password: string;
};

type signUpProps = {
  userData: userDataType;
};

export interface userDataType {
  uid: string;
  email: string;
  roleAssigned: boolean;
  roles: Roles;
  password: string;
  confirmPassword: string;
  displayName: string;
  createdAt: string;
}

export interface Roles {
  submitter?: boolean;
  admin?: boolean;
  manager?: boolean;
  developer?: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderPropsType) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentUserData, setCurrentUserData] = useState<
    DocumentData | undefined
  >();
  const navigate = useNavigate();
  const { writeData, readDoc } = useFirestore();
  const [profileImg, setProfileImg] = useState(
    "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
  );
  const [loading, setLoading] = useState(true);
  const [userDataPending, setUserDataPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser) {
      setCurrentUserData(undefined);
      setProfileImg(
        "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
      );
      return;
    }

    if (currentUser?.photoURL) {
      setProfileImg(currentUser.photoURL);
    }

    const getUserData = async (userId: string) => {
      try {
        const userData = await readDoc({
          collectionName: "users",
          uid: userId,
        });
        setCurrentUserData(userData);
      } catch (error) {
        console.error(error);
      }
    };

    getUserData(currentUser.uid);
  }, [currentUser]);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      listen();
    };
  }, []);

  useEffect(() => {
    if (currentUser && currentUserData) {
      setUserDataPending(false);
    }
  }, [currentUser, currentUserData]);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setCurrentUserData(undefined);
        navigate("/signin");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  };

  const signIn = async ({ e, email, password }: signInProps) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (email === "" || password === "") {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
      setLoading(false);
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("User not found");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts, please try again later");
          break;
        case "auth/network-request-failed":
          setError("A network error occurred");
          break;
        case "auth/user-token-expired":
          setError("User session expired");
          break;
        case "auth/wrong-password":
          setError("Wrong password, please try again");
          break;
        default:
          setError("Something went wrong, please try again later");
          break;
      }

      setLoading(false);
    }
  };

  const signUp = async ({ userData }: signUpProps) => {
    if (
      userData.email === "" ||
      userData.password === "" ||
      userData.confirmPassword === ""
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setError("Password don't match");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );

      await updateProfile(userCredential.user, {
        displayName: userData.displayName,
      });

      const data = {
        uid: userCredential.user.uid,
        displayName: userData.displayName,
        email: userData.email,
        roleAssigned: userData.roleAssigned,
        roles: userData.roles,
        createdAt: userData.createdAt,
      };

      writeData("users", userCredential.user.uid, data);

      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log("sign up failed");
      setError("Sign up failed");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader loading={loading} />;
  }

  const AuthValues = {
    currentUser,
    currentUserData,
    signOut,
    signIn,
    signUp,
    loading,
    userDataPending,
    error,
    setError,
    profileImg,
  };
  return (
    <AuthContext.Provider value={AuthValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
