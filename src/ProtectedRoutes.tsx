import { Outlet } from "react-router";
import SignIn from "./components/auth/signin/SignIn";
import { useAuth } from "./hooks/useAuth";
import { useEffect, useState } from "react";

const getAuthStatus = () => {
  const [authLoaded, setAuthLoaded] = useState<boolean>(false);
  const user = useAuth();

  useEffect(() => {
    if (user) {
      setAuthLoaded(true);
    } else {
      setAuthLoaded(false);
    }
  }, [user]);

  return authLoaded;
};

const ProtectedRoutes = () => {
  const isAuth = getAuthStatus();
  return isAuth ? <Outlet /> : <SignIn />;
};

export default ProtectedRoutes;
