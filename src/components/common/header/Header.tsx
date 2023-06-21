import { Avatar } from "@mui/material";
import img1 from "../../../assets/man-smiling.jpg";
import style from "./header.module.css";
import { Logout } from "@mui/icons-material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import useAuth from "../../../hooks/useAuth";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  GlobalContext,
  GlobalContextType,
} from "../../../contexts/GlobalContext";
import { AuthContext, AuthContextType } from "../../../contexts/AuthContext";

const subMenuLinks = [
  {
    title: "Profile settings",
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
];

const Header = () => {
  const { signOut } = useAuth();
  const { subMenuOpen, toggleSubMenuOpen } = useContext(
    GlobalContext
  ) as GlobalContextType;

  const { currentUser } = useContext(AuthContext) as AuthContextType;

  const handleProfileClick = () => {
    toggleSubMenuOpen();
  };

  const handleLogoutLinkClick = () => {
    signOut();
    toggleSubMenuOpen();
  };

  return (
    <div className={style.container}>
      <nav className={style.header}>
        <div className={style["logo-container"]}>
          <h1 className='app-title'>Bug Tracker 2.0</h1>
        </div>
        <div className={style["menu-wrapper"]}>
          <div
            className={style["avatar-container"]}
            onClick={handleProfileClick}
          >
            {/* <KeyboardArrowDownOutlinedIcon fontSize='large' /> */}
            <Avatar
              alt='man smiling'
              src={img1}
              sx={{ width: 60, height: 60 }}
            />
          </div>
          <div
            className={
              subMenuOpen
                ? `${style["open-menu"]} ${style["sub-menu-wrap"]}`
                : style["sub-menu-wrap"]
            }
          >
            <div className={style["sub-menu"]}>
              <div className={style["user-info"]}>
                <Avatar
                  className={style["user-info-avatar"]}
                  alt='man smiling'
                  src={img1}
                  sx={{ width: 40, height: 40 }}
                />
                <h2>{currentUser?.displayName}</h2>
              </div>
              <hr />
              {subMenuLinks.map((link, index) => (
                <Link to={link.path} key={index} onClick={toggleSubMenuOpen}>
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
              <div
                className={style["user-info-links"]}
                onClick={handleLogoutLinkClick}
              >
                <div className={style["icon-container"]}>
                  <Logout
                    className={style.icons}
                    sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                    fontSize='large'
                  />
                </div>
                <p>Log out</p>
                <span>
                  <KeyboardArrowRightOutlinedIcon
                    className={style["right-arrows"]}
                    sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                    fontSize='large'
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
