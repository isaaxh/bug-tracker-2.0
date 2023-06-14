import React from "react";
import style from "./sidebar.module.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const sidebarLinks = [
  {
    title: "Dashboard",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: <BusinessCenterOutlinedIcon />,
  },
  {
    title: "Tickets",
    path: "/tickets",
    icon: <ConfirmationNumberOutlinedIcon />,
  },
  {
    title: "Profile Settings",
    path: "/profile",
    icon: <PersonOutlinedIcon />,
  },
];

const Sidebar = () => {
  return (
    <nav className={style.container}>
      <ul className={style["tab-list"]}>
        {sidebarLinks.map((link, index) => (
          <Link to={link.path} key={index}>
            <li className={style.links}>
              <div className={style.icons}>{link.icon}</div>
              {link.title}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
