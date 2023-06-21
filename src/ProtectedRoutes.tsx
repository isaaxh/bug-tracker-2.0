import { Outlet } from "react-router";
import SignIn from "./components/auth/signin/SignIn";
import useAuth from "./hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import Sidebar from "./components/common/sidebar/Sidebar";
import Header from "./components/common/header/Header";
import useWindowDimensions from "./hooks/useWindowDimensions";
import SidebarMobile from "./components/common/sidebar/SidebarMobile";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Modal from "./components/common/modal/modal";
import { GlobalContext, GlobalContextType } from "./contexts/GlobalContext";

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
  const { toggleTabMenuOpen } = useContext(GlobalContext) as GlobalContextType;
  const isAuth = getAuthStatus();
  const { width } = useWindowDimensions();

  return isAuth ? (
    <div className='main-container'>
      <div className='header-container'>
        <Header />
      </div>
      <div
        className={
          width > 1200 ? "content-container" : "mobile-content-container"
        }
      >
        {width && width > 1200 ? (
          <Sidebar />
        ) : (
          <>
            <div className='tab-dropdown-container'>
              <h2 onClick={toggleTabMenuOpen}>Tab</h2>
              <KeyboardArrowDownIcon
                className='tab-dropdown-icon'
                fontSize='large'
              />
            </div>
            <SidebarMobile />
          </>
        )}
        <Outlet />
      </div>
      <Modal />
    </div>
  ) : (
    <SignIn />
  );
};

export default ProtectedRoutes;
