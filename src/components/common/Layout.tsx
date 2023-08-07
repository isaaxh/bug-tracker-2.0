import { useContext } from "react";
import { Outlet } from "react-router";
import Header from "./header/Header";
import Modal from "./modal/Modal";
import Sidebar from "./sidebar/Sidebar";
import SidebarMobile from "./sidebar/SidebarMobile";
import { GlobalContext, GlobalContextType } from "../../contexts/GlobalContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Layout = () => {
  const { toggleTabMenuOpen } = useContext(GlobalContext) as GlobalContextType;
  const { width } = useWindowDimensions();
  return (
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
  );
};

export default Layout;
