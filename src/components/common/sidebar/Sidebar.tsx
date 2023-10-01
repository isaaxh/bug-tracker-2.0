import style from "./sidebar.module.css";
import { NavLink } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import useGlobal from "../../../hooks/useGlobal";
import { GlobalContextType } from "../../../contexts/GlobalContext";
import { TabContextType } from "../../../contexts/TabContext";
import useTab from "../../../hooks/useTab";

const Sidebar = () => {
  const { setCurrentTab } = useGlobal() as GlobalContextType;
  const { authorizedTabs, loading } = useTab() as TabContextType;

  if (loading)
    return (
      <div style={{ display: "grid", placeItems: "start", padding: 100 }}>
        <MoonLoader
          className={style.spinner}
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="loader"
          size={30}
        />
      </div>
    );
  return (
    <nav className={style.container}>
      <ul className={style["tab-list"]}>
        {authorizedTabs.map((link) => (
          <li className={`${style.links}`} key={link.path}>
            <NavLink to={link.path} onClick={() => setCurrentTab(link.title)}>
              <div className={style["icon-container"]}>{link.icon}</div>
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
