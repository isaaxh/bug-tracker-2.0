import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router";

const useAuth = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const signOut = () => {
        auth.signOut().then(() => {
            navigate("/")
        }
        ).catch((error) => {
            console.log(error)
        })
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
    }, []);

    return { currentUser, signOut };
}

export default useAuth;