import SignIn from "./components/auth/signin/SignIn";
import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";
import Layout from "./components/common/Layout";

const getAuthStatus = () => {
  const [authLoaded, setAuthLoaded] = useState<boolean>(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setAuthLoaded(true);
    } else {
      setAuthLoaded(false);
    }
  }, [currentUser]);

  return authLoaded;
};

const ProtectedRoutes = () => {
  const isAuth = getAuthStatus();

  return isAuth ? <Layout /> : <SignIn />;
};

export default ProtectedRoutes;
