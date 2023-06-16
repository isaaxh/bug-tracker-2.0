import style from "./sidebar.module.css";
import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import { useState } from "react";

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
  // {
  //   title: "Profile Settings",
  //   path: "/profile",
  //   icon: (
  //     <PersonOutlinedIcon
  //       className={style.icons}
  //       sx={{ stroke: "#ffffff", strokeWidth: 1 }}
  //       fontSize='large'
  //     />
  //   ),
  // },
];

interface navLinkProps {
  isActive: boolean;
}

const Sidebar = () => {
  // const [isTabActive, setIsTabActive] = useState(false);

  // const navLinkStyles = ({ isActive }: navLinkProps) => {
  //   if (isActive)
  //     return {
  //       fontWeight: 600,
  //     };
  // };

  return (
    <nav className={style.container}>
      <ul className={style["tab-list"]}>
        {sidebarLinks.map((link, index) => (
          <li className={`${style.links}`} key={index}>
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
