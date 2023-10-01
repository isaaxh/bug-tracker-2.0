import { useContext } from "react";
import { Outlet } from "react-router";
import Header from "./header/Header";
import Modal from "./modal/Modal";
import Sidebar from "./sidebar/Sidebar";
import SidebarMobile from "./sidebar/SidebarMobile";
import { GlobalContext, GlobalContextType } from "../../contexts/GlobalContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useGlobal from "../../hooks/useGlobal";

const Layout = () => {
  const { toggleTabMenuOpen } = useContext(GlobalContext) as GlobalContextType;
  const { currentTab } = useGlobal() as GlobalContextType;
  const { width } = useWindowDimensions();
  return (
    <main className="main-container">
      <div className="header-container">
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
            <button
              type="button"
              className="tab-dropdown-btn"
              onClick={() => {
                toggleTabMenuOpen();
              }}
            >
              <h2>{currentTab}</h2>
              <KeyboardArrowDownIcon
                className="tab-dropdown-icon"
                fontSize="large"
              />
            </button>
            <SidebarMobile />
          </>
        )}
        <Outlet />
      </div>
      <Modal />
    </main>
  );
};

export default Layout;
