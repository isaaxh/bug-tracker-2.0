import style from "./sidebar.module.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

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

interface sidebarClosedProps {
  sidebarClosed: boolean;
  setSetSidebarClosed: (currentState: any) => void;
}

const SidebarMobile = ({
  sidebarClosed,
  setSetSidebarClosed,
}: sidebarClosedProps) => {
  //   const [sidebarClosed, setSetSidebarClosed] = useState(true);

  useEffect(() => {
    console.log(sidebarClosed);
  }, [sidebarClosed]);

  return (
    <div
      className={
        sidebarClosed ? `${style.open} ${style.overlay}` : `${style.overlay}`
      }
    >
      <div className={style["cross-container"]}>
        <ClearIcon
          className={style.cross}
          sx={{ stroke: "black" }}
          fontSize='large'
          onClick={() => setSetSidebarClosed((prev: boolean) => !prev)}
        />
      </div>
      <ul className={style["tab-list"]}>
        {sidebarLinks.map((link, index) => (
          <li className={`${style.links}`} key={index}>
            <NavLink
              to={link.path}
              onClick={() => setSetSidebarClosed((prev: boolean) => !prev)}
            >
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
