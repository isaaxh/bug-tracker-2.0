import style from "./sidebar.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import {
  GlobalContext,
  GlobalContextType,
} from "../../../contexts/GlobalContext";
import useGlobal from "../../../hooks/useGlobal";
import { TabContextType } from "../../../contexts/TabContext";
import useTab from "../../../hooks/useTab";

const SidebarMobile = () => {
  const { authorizedTabs } = useTab() as TabContextType;
  const { setCurrentTab } = useGlobal() as GlobalContextType;
  const { tabMenuOpen, toggleTabMenuOpen } = useContext(
    GlobalContext,
  ) as GlobalContextType;

  const getCurrentTab = () => {
    const tabs = authorizedTabs.filter(
      (link) => link.path === window.location.pathname,
    );
    setCurrentTab(tabs[0]?.title);
  };

  useEffect(() => {
    getCurrentTab();
  }, []);

  return (
    <div
      className={
        tabMenuOpen ? `${style.overlay} ${style.open}` : `${style.overlay}`
      }
    >
      <div className={style["cross-container"]} onClick={toggleTabMenuOpen}>
        <ClearIcon
          className={style.cross}
          sx={{ stroke: "black" }}
          fontSize="large"
        />
      </div>
      <ul className={style["tab-list"]}>
        {authorizedTabs.map((link, index) => (
          <li
            className={`${style.links}`}
            key={index}
            onClick={() => setCurrentTab(link.title)}
          >
            <NavLink to={link.path} onClick={() => toggleTabMenuOpen()}>
              <div className={style["icon-container"]}>{link.icon}</div>
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMobile;
