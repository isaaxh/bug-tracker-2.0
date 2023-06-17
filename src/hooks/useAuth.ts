import {
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import { FormEvent, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router";
import { addDoc, collection } from "firebase/firestore";
import useFirestore from "./useFirestore";

interface signInProps {
    e: FormEvent<HTMLFormElement>,
    email: string,
    password: string,
}

interface signUpProps {
    e: FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    confirmPassword: string,
    displayName: string,

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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

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

    const signUp = async ({ e, email, password, confirmPassword, displayName }: signUpProps) => {
        e.preventDefault();
        setLoading(true);

        if (email === "" || password === "" || confirmPassword === "") {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Password don't match");
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(userCredential.user, {
                displayName: displayName,
            });

            const data = {
                displayName,
                email,
                // role,
            }

            writeData("users", userCredential.user.uid, data);

            // try {
            //     const docRef = await addDoc(collection(db, "users"), {
            //         email,
            //         displayName,
            //     });

            //     console.log("Document written with ID: ", docRef.id);
            // } catch (error) {
            //     console.log("Error adding document: ", error);
            // }

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