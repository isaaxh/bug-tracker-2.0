import {
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import { FormEvent, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import useFirestore from "./useFirestore";

interface signInProps {
    e: FormEvent<HTMLFormElement>,
    email: string,
    password: string,
}

interface signUpProps {
    e: FormEvent<HTMLFormElement>,
    userData: userData,

}

interface userData {
    email: string,
    role: roleProps,
    password: string,
    confirmPassword: string,
    displayName: string,
}

interface roleProps {
    admin: boolean;
    manager: boolean;
    developer: boolean;
}

const useAuth = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const { writeData } = useFirestore();

    const signOut = () => {
        auth.signOut().then(() => {
            navigate("/")
        }
        ).catch((error) => {
            console.log(error)
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
            setLoading(false);
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

    const signUp = async ({ e, userData }: signUpProps) => {
        e.preventDefault();
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
                role: userData.role,
            }

            writeData("users", userCredential.user.uid, data);

            navigate("/");
        } catch (error) {
            setError("Something went wrong");
            setLoading(false);
        }
    }

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

    return { currentUser, signOut, signIn, signUp, loading, error, setError };
}

export default useAuth;