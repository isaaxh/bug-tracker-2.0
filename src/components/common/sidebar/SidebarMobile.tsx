import style from "./sidebar.module.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import {
  GlobalContext,
  GlobalContextType,
} from "../../../contexts/GlobalContext";
import useAuth from "../../../hooks/useAuth";
import { AuthContextType } from "../../../contexts/AuthContext";

const sidebarLinks = [
  {
    title: "Dashboard",
    path: "/",
    icon: (
      <HomeOutlinedIcon
        className={style.icons}
        sx={{ stroke: "#ffffff", strokeWidth: 1 }}
        fontSize='large'
      />
    ),
  },

  {
    title: "Role Assignment",
    path: "/role_assignment",
    icon: (
      <GroupAddOutlinedIcon
        className={style.icons}
        sx={{ stroke: "#ffffff", strokeWidth: 1 }}
        fontSize='large'
      />
    ),
  },
  {
    title: "Project Users",
    path: "/project_users",
    icon: (
      <PeopleOutlineOutlinedIcon
        className={style.icons}
        sx={{ stroke: "#ffffff", strokeWidth: 1 }}
        fontSize='large'
      />
    ),
  },
  {
    title: "Projects",
    path: "/projects",
    icon: (
      <BusinessCenterOutlinedIcon
        className={style.icons}
        sx={{ stroke: "#ffffff", strokeWidth: 1 }}
        fontSize='large'
      />
    ),
  },
  {
    title: "Tickets",
    path: "/tickets",
    icon: (
      <ConfirmationNumberOutlinedIcon
        className={style.icons}
        sx={{ stroke: "#ffffff", strokeWidth: 1 }}
        fontSize='large'
      />
    ),
  },
];

const SidebarMobile = () => {
    const { currentUserData } = useAuth() as AuthContextType; 
    const [allowedLinks, setAllowedLinks] = useState(sidebarLinks);
    const { tabMenuOpen, toggleTabMenuOpen } = useContext(
        GlobalContext
    ) as GlobalContextType;


    const filterAllowedRoles = () => {

        const filteredLinks = sidebarLinks.filter((link) => {
                if (currentUserData?.roles?.admin) return true;
                if (currentUserData?.roles?.manager && link.path !== '/role_assignment') return true;
                if (currentUserData?.roles?.developer && (link.path === '/' || link.path === '/tickets')) return true;
            })

        return filteredLinks
    }

    useEffect(() => {
        setAllowedLinks(filterAllowedRoles())
    }, [])


  return (
    <div
      className={
        tabMenuOpen ? `${style.overlay} ${style.open}` : `${style.overlay}`
      }
    >
      <div
        className={style["cross-container"]}
        onClick={() => toggleTabMenuOpen()}
      >
        <ClearIcon
          className={style.cross}
          sx={{ stroke: "black" }}
          fontSize='large'
        />
      </div>
      <ul className={style["tab-list"]}>
        {allowedLinks.map((link, index) => (
          <li className={`${style.links}`} key={index}>
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
