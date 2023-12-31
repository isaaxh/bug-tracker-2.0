import style from "./header.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Logout, NotificationsNoneOutlined } from "@mui/icons-material";
import useAuth from "../../../hooks/useAuth";
import { GlobalContextType } from "../../../contexts/GlobalContext";
import { AuthContextType } from "../../../contexts/AuthContext";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import useGlobal from "../../../hooks/useGlobal";
import { getRole } from "../../../utils/Helpers";

const userActionsLinks = [
  {
    title: "Notifications",
    className: "user-info-links",
    path: "#",
    icon: (
      <NotificationsNoneOutlined
        className={style.icons}
        sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
        fontSize="large"
      />
    ),
  },
  {
    title: "Profile Settings",
    className: "user-info-links",
    path: "/profile",
    icon: (
      <PersonOutlinedIcon
        className={style.icons}
        sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
        fontSize="large"
      />
    ),
  },
];

const UserActions = () => {
  const { signOut } = useAuth() as AuthContextType;
  const { userActionsOpen, toggleUserActionsOpen, setCurrentTab } =
    useGlobal() as GlobalContextType;

  const { currentUserData, profileImg } = useAuth() as AuthContextType;

  const { width } = useWindowDimensions();

  const getCurrentTab = () => {
    const currentTab = userActionsLinks.filter(
      (link) => link.path === window.location.pathname,
    );
    setCurrentTab(currentTab[0]?.title);
  };

  useEffect(() => {
    getCurrentTab();
  }, []);

  const handleLogoutLinkClick = () => {
    signOut();
    toggleUserActionsOpen();
  };

  const profileSettingsOnClick = () => {
    toggleUserActionsOpen();
    setCurrentTab("Profile Settings");
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
            alt="man smiling"
            src={profileImg}
            sx={{ width: 40, height: 40 }}
          />
          <div className={style["user-info-text"]}>
            <h2>{currentUserData?.displayName}</h2>
            <p>{currentUserData && getRole(currentUserData.roles)}</p>
          </div>
        </div>
        <hr />

        {/* Search bar */}
        {width < 600 ? (
          <>
            <div
              className={style["user-info-links"]}
              onClick={handleLogoutLinkClick}
            >
              <div className={style["icon-container"]}>
                <SearchOutlinedIcon
                  className={style.icons}
                  sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                  fontSize="large"
                />
              </div>
              <p>Search</p>
              <span>
                <KeyboardArrowRightOutlinedIcon
                  className={style["right-arrows"]}
                  sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                  fontSize="large"
                />
              </span>
            </div>
            <div
              className={style["user-info-links"]}
              onClick={handleLogoutLinkClick}
            >
              <div className={style["icon-container"]}>
                <NotificationsNoneOutlined
                  className={style.icons}
                  sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                  fontSize="large"
                />
              </div>
              <p>Notifications</p>
              <span>
                <KeyboardArrowRightOutlinedIcon
                  className={style["right-arrows"]}
                  sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                  fontSize="large"
                />
              </span>
            </div>
          </>
        ) : null}

        {/* USERACTIONS LINKS */}
        {userActionsLinks.map((link, index) => (
          <Link
            to={link.path}
            key={index}
            onClick={
              link.title === "Profile Settings"
                ? profileSettingsOnClick
                : toggleUserActionsOpen
            }
          >
            <div className={style["user-info-links"]}>
              <div className={style["icon-container"]}>{link.icon}</div>
              <p>{link.title}</p>
              <span>
                <KeyboardArrowRightOutlinedIcon
                  className={style["right-arrows"]}
                  sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
                  fontSize="large"
                />
              </span>
            </div>
          </Link>
        ))}

        {/*  LOGOUT  */}
        <div
          className={style["user-info-links"]}
          onClick={handleLogoutLinkClick}
        >
          <div className={style["icon-container"]}>
            <Logout
              className={style.icons}
              sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
              fontSize="large"
            />
          </div>
          <p>Log out</p>
          <span>
            <KeyboardArrowRightOutlinedIcon
              className={style["right-arrows"]}
              sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
              fontSize="large"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserActions;
