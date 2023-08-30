import {useLocation, Navigate} from "react-router-dom"
import useAuth from '../hooks/useAuth'
import { AuthContextType } from "../contexts/AuthContext";
import Layout from "./common/Layout";
import { useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { Roles } from "../contexts/AuthContext";

type RequireAuthPropsType = {
    allowedRole: Roles;
}

const RequireAuth = ({allowedRole}: RequireAuthPropsType) => {
    const { currentUser, currentUserData } = useAuth() as AuthContextType;
    const location = useLocation();
    const { readDoc } = useFirestore();
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    const haveMatchingRoles = (allowedRole: Roles, userRoles: Roles) => {
        
        for (const role in allowedRole) {
            if (allowedRole[role] && userRoles[role]) {
               setIsAuthorized(true)
                return true;
            } 
        }
        return false;
    }

    useEffect(() => {

        if (!currentUser) {
            setLoading(false)
            return;
        }


        const getUserData = async (userId: string) => {
             try {
                const userData = await readDoc({collectionName: 'users', uid: userId});
                setIsAuthorized(haveMatchingRoles(allowedRole, userData?.roles))
                setLoading(false)
             } catch (error) {
                 console.log(error);
                 setLoading(false)
             }
         }
        
         getUserData(currentUser?.uid as string)    

    }, [currentUser, location])

    if (loading) {
        return <div>loading...</div>
    }

        return (
            currentUser && isAuthorized
                ? <Layout />
                : currentUser
                    ? <Navigate to="/unauthorized" state={{from: location}} replace/>
                    : <Navigate to="/signin" state={{from: location}} replace/> 
               )
}

export default RequireAuth



