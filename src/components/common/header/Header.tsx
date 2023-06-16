import { Avatar } from "@mui/material";
import img1 from "../../../assets/man-smiling.jpg";
import style from "./header.module.css";
import { Logout } from "@mui/icons-material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Link } from "react-router-dom";

const subMenuLinks = [
  {
    title: "Edit Profile",
    className: "user-info-links",
    path: "/profile",
    icon: (
      <PersonOutlinedIcon
        className={style.icons}
        sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
        fontSize='large'
      />
    ),
  },
  {
    title: "Settings",
    className: "user-info-links",
    path: "/",
    icon: (
      <SettingsOutlinedIcon
        className={style.icons}
        sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
        fontSize='large'
      />
    ),
  },
  {
    title: "Log out",
    className: "user-info-links",
    path: "",
    icon: (
      <Logout
        className={style.icons}
        sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
        fontSize='large'
      />
    ),
  },
];

const Header = () => {
  return (
    <div className={style.container}>
      <nav className={style.header}>
        <div className={style["logo-container"]}>
          <h1 className='app-title'>Bug Tracker 2.0</h1>
        </div>
        <div className='menu-wrapper'>
          <div className={style["avatar-container"]}>
            <Avatar
              alt='man smiling'
              src={img1}
              sx={{ width: 60, height: 60 }}
            />
          </div>
          <div className={style["sub-menu-wrap"]}>
            <div className={style["sub-menu"]}>
              <div className={style["user-info"]}>
                <Avatar
                  className={style["user-info-avatar"]}
                  alt='man smiling'
                  src={img1}
                  sx={{ width: 40, height: 40 }}
                />
                <h2>Isaac Hussain</h2>
              </div>
              <hr />
              {subMenuLinks.map((link, index) => (
                <Link to={link.path} key={index}>
                  <div className={style["user-info-links"]}>
                    <div className={style["icon-container"]}>{link.icon}</div>
                    <p>{link.title}</p>
                    <span>
                      <KeyboardArrowRightOutlinedIcon
                        className={style["right-arrows"]}
                        sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                        fontSize='large'
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
