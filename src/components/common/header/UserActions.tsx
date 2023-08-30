import style from "./header.module.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Logout, NotificationsNoneOutlined } from "@mui/icons-material";
import useAuth from "../../../hooks/useAuth";
import {
  GlobalContext,
  GlobalContextType,
} from "../../../contexts/GlobalContext";
import { AuthContext, AuthContextType } from "../../../contexts/AuthContext";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

const userActionsLinks = [
  // {
  //   title: "Notifications",
  //   className: "user-info-links",
  //   path: "#",
  //   icon: (
  //     <NotificationsNoneOutlined
  //       className={style.icons}
  //       sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
  //       fontSize='large'
  //     />
  //   ),
  // },
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

const UserActions = () => {
  const { signOut } = useAuth() as AuthContextType;
  const { userActionsOpen, toggleUserActionsOpen } = useContext(
    GlobalContext
  ) as GlobalContextType;

  const { currentUser, profileImg } = useContext(
    AuthContext
  ) as AuthContextType;

  const { width } = useWindowDimensions();

  const handleLogoutLinkClick = () => {
    signOut();
    toggleUserActionsOpen();
  };
  return (
    <div
      className={
        userActionsOpen
          ? `${style["open-menu"]} ${style["user-actions-wrap"]}`
          : style["user-actions-wrap"]
      }
    >
      <div className={style["user-actions"]}>
        <div className={style["user-info"]}>
          <Avatar
            className={style["user-info-avatar"]}
            alt='man smiling'
            src={profileImg}
            sx={{ width: 40, height: 40 }}
          />
          <h2>{currentUser?.displayName}</h2>
        </div>
        <hr />
        {width < 600 ? (
          <>
            <div
              className={style["user-info-links"]}
              // onClick={handleLogoutLinkClick}
            >
              <div className={style["icon-container"]}>
                <SearchOutlinedIcon
                  className={style.icons}
                  sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                  fontSize='large'
                />
              </div>
              <p>Search</p>
              <span>
                <KeyboardArrowRightOutlinedIcon
                  className={style["right-arrows"]}
                  sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                  fontSize='large'
                />
              </span>
            </div>
            <div
              className={style["user-info-links"]}
              // onClick={handleLogoutLinkClick}
            >
              <div className={style["icon-container"]}>
                <NotificationsNoneOutlined
                  className={style.icons}
                  sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                  fontSize='large'
                />
              </div>
              <p>Notifications</p>
              <span>
                <KeyboardArrowRightOutlinedIcon
                  className={style["right-arrows"]}
                  sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                  fontSize='large'
                />
              </span>
            </div>
          </>
        ) : null}
        {userActionsLinks.map((link, index) => (
          <Link to={link.path} key={index} onClick={toggleUserActionsOpen}>
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
  );
};

export default UserActions;
