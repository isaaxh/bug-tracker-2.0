import {useLocation, Navigate} from "react-router-dom"
import useAuth from '../hooks/useAuth'
import { AuthContextType } from "../contexts/AuthContext";
import Layout from "./common/Layout";
import { useEffect, useState } from "react";
import { Roles } from "../contexts/AuthContext";

type RequireAuthPropsType = {
    allowedRole: Roles;
}

const RequireAuth = ({allowedRole}: RequireAuthPropsType) => {
    const { currentUser, currentUserData } = useAuth() as AuthContextType;
    const location = useLocation();
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

        if (!currentUserData) {
            setLoading(true)
            return;
        }

         setIsAuthorized(haveMatchingRoles(allowedRole, currentUserData.roles))
         
         setLoading(false)
        

    }, [currentUserData, location])

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



