import { User, onAuthStateChanged } from "firebase/auth";
import { FormEvent, useEffect, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";

interface signInProps {
    e: FormEvent<HTMLFormElement>,
    email: string,
    password: string,
}

const useAuth = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate();

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
        } catch (error) {
            console.log(error.message.Firebase);
            setError(error.message);
            setLoading(false);
        }
    };

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
    }, []);

    return { currentUser, signOut, signIn, loading, error, setError };
}

export default useAuth;