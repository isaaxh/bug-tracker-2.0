import { Outlet } from "react-router";
import SignIn from "./components/auth/signin/SignIn";
import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";
import Sidebar from "./components/common/sidebar/Sidebar";
import Header from "./components/common/header/Header";

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
  return isAuth ? (
    <div className='main-container'>
      <div className='header-container'>
        <Header />
      </div>
      <div className='content-container'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  ) : (
    <SignIn />
  );
};

export default ProtectedRoutes;
