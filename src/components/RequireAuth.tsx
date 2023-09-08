import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AuthContextType } from "../contexts/AuthContext";
import Layout from "./common/Layout";
import { useEffect, useState } from "react";
import { Roles } from "../contexts/AuthContext";
import Loader from "./common/Loader";

type RequireAuthPropsType = {
  allowedRole: Roles;
};

const RequireAuth = ({ allowedRole }: RequireAuthPropsType) => {
  const { currentUser, currentUserData, userDataPending } =
    useAuth() as AuthContextType;
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const haveMatchingRoles = (allowedRole: Roles, userRoles: Roles) => {
    for (const role in allowedRole) {
      if (allowedRole.hasOwnProperty(role) && userRoles.hasOwnProperty(role)) {
        setIsAuthorized(true);
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    //runs when app is loaded for the first time
    if (!currentUser && !currentUserData) {
      setLoading(false);
      return;
    }

    if (!currentUser || !currentUserData) {
      setLoading(true);
      return;
    }

    setIsAuthorized(haveMatchingRoles(allowedRole, currentUserData.roles));
    setLoading(false);
  }, [currentUser, currentUserData, location]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  return isAuthorized ? (
    <Layout />
  ) : currentUser ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signin" />
  );
};

export default RequireAuth;
