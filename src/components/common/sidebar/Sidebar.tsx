import style from "./sidebar.module.css";
import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import useAuth from "../../../hooks/useAuth";
import { AuthContextType } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";


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


const Sidebar = () => {
    const { currentUserData } = useAuth() as AuthContextType;
    const [allowedLinks, setAllowedLinks] = useState(sidebarLinks);
    const [loading, setLoading] = useState(true)

    const filterAllowedRoles = () => {

        const filteredLinks = sidebarLinks.filter((link) => {
                if (currentUserData?.roles?.admin) return true;
                if (currentUserData?.roles?.manager && link.path !== '/role_assignment') return true;
                if (currentUserData?.roles?.developer && (link.path === '/' || link.path === '/tickets')) return true;
            })

        setLoading(false)
        return filteredLinks
    }

    useEffect(() => {
        setAllowedLinks(filterAllowedRoles())
    }, [])

    
   if (loading) return (
        <div style={{display: 'grid', placeItems: 'start', padding: 100}}>
            <MoonLoader
                className={style.spinner}
                loading={loading}
                aria-label='Loading Spinner'
                data-testid='loader'
                size={30}
            />
        </div>
        );
  return (
    <nav className={style.container}>
      <ul className={style["tab-list"]}>
        {allowedLinks.map((link) => (
          <li className={`${style.links}`} key={link.path}>
            <NavLink to={link.path}>
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
