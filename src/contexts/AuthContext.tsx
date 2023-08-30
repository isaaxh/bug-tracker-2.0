import { ReactNode, FormEvent, createContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { Navigate } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import useFirestore from "../hooks/useFirestore";
import { DocumentData } from "firebase/firestore";

interface AuthProviderPropsType {
    children: ReactNode;
}

export interface AuthContextType {
    currentUser: User | null;
    currentUserData: DocumentData | undefined; 
    signUp: ({userData}:signUpProps) => Promise<void>;
    signIn: ({e, email, password}:signInProps) => Promise<void>;
    signOut: () => void; 
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>; 
    profileImg: string;
    loading: boolean;
}

type signInProps = {
    e: FormEvent<HTMLFormElement>,
    email: string,
    password: string,
}

type signUpProps = {
    userData: userDataType,
}

export interface userDataType {
    email: string,
    roleAssigned: boolean,
    roles: Roles,
    password: string,
    confirmPassword: string,
    displayName: string,
}

export interface Roles {
    admin?: boolean;
    manager?: boolean;
    developer?: boolean;
}


export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderPropsType) => {
    const [currentUser, setCurrentUser] = useState<User| null>(null);
    const [currentUserData, setCurrentUserData] = useState<DocumentData | undefined>();
    const navigate = useNavigate();
    const { writeData, readDoc } = useFirestore();
    const [profileImg, setProfileImg] = useState(
    "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
    );
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!currentUser) {
                console.log('no user')
            return;
        }

     if (currentUser?.photoURL) {
        setProfileImg(currentUser.photoURL);
        return;
        }
            setProfileImg(
            "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
            );

        const getUserData = async (userId: string) => {
            try {
                const userData = await readDoc({collectionName: 'users', uid: userId});
                console.log(userData)
                setCurrentUserData(userData)
            } catch (error) {
                console.log(error);
            }
        }

        getUserData(currentUser.uid)    

    }, [currentUser]);
  

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });


        return () => {
            listen();
        };
    }, [])



    const signOut = () => {
        setLoading(true)
       auth.signOut().then(() => {
            <Navigate to="/signin"/>
            setLoading(false)
        }
        ).catch((error) => {
            console.log(error)
            setError(error.message)
            setLoading(false)
        })
    }

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
        } catch (error: any) {
            switch (error.code) {
                case "auth/user-not-found":
                    setError("User not found");
                    break;
                case "auth/too-many-requests":
                    setError('Too many attempts, please try again later')
                    break;
                case "auth/network-request-failed":
                    setError("A network error occurred")
                    break;
                case "auth/user-token-expired":
                    setError("User session expired")
                    break;
                case "auth/wrong-password":
                    setError("Wrong password, please try again")
                    break;
                default:
                    setError('Something went wrong, please try again later')
                    break;
            }

            setLoading(false);
        }

    };

    const signUp = async ({ userData }: signUpProps) => {
        setLoading(true);

        if (userData.email === "" || userData.password === "" || userData.confirmPassword === "") {
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
                userData.password
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
            }

            writeData("users", userCredential.user.uid, data);

            navigate("/");
        } catch (error) {
            setError("Something went wrong");
            setLoading(false);
        }
    }



  const AuthValues = {
    currentUser,
    currentUserData,
    signOut,
    signIn,
    signUp,
    loading,
    error,
    setError,
    profileImg, 
  };
  return (
    <AuthContext.Provider value={AuthValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
