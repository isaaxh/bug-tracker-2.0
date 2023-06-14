import React from "react";
import style from "./sidebar.module.css";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

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
  {
    title: "Profile Settings",
    path: "/profile",
    icon: (
      <PersonOutlinedIcon
        className={style.icons}
        sx={{ stroke: "#ffffff", strokeWidth: 1 }}
        fontSize='large'
      />
    ),
  },
];

const Sidebar = () => {
  return (
    <nav className={style.container}>
      <ul className={style["tab-list"]}>
        {sidebarLinks.map((link, index) => (
          <Link to={link.path} key={index}>
            <li className={style.links}>
              <div className={style["icon-container"]}>{link.icon}</div>
              {link.title}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
