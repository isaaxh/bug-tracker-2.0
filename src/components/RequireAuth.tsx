import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AuthContextType } from "../contexts/AuthContext";
import Layout from "./common/Layout";
import { useEffect, useState, useMemo } from "react";
import { Roles } from "../contexts/AuthContext";

type RequireAuthPropsType = {
  allowedRole: Roles;
};

const RequireAuth = ({ allowedRole }: RequireAuthPropsType) => {
  const { currentUser, currentUserData } = useAuth() as AuthContextType;
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const haveMatchingRoles = (allowedRole: Roles, userRoles: Roles) => {
    for (const role in allowedRole) {
      if (allowedRole[role] && userRoles[role]) {
        setIsAuthorized(true);
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (!currentUser || !currentUserData) {
      console.log("user or data loading");
      setLoading(true);
      return;
    }

    setIsAuthorized(haveMatchingRoles(allowedRole, currentUserData?.roles));
    setLoading(false);
  }, [currentUser, currentUserData, location]);

  if (loading) {
    return <div>loading...</div>;
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
