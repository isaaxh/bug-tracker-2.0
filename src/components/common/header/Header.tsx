import style from "./header.module.css";
import { Avatar } from "@mui/material";
import { useContext } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  GlobalContext,
  GlobalContextType,
} from "../../../contexts/GlobalContext";
import { AuthContext, AuthContextType } from "../../../contexts/AuthContext";
import UserActions from "./UserActions";
import SearchBar from "./SearchBar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
const Header = () => {
  const { toggleUserActionsOpen } = useContext(
    GlobalContext
  ) as GlobalContextType;

  const { profileImg } = useContext(AuthContext) as AuthContextType;

  const { width } = useWindowDimensions();

  const handleProfileClick = () => {
    toggleUserActionsOpen();
  };

  return (
    <div className={style.container}>
      <nav className={style.header}>
        <div className={style["logo-container"]}>
          <h1 className='app-title'>Bug Tracker 2.0</h1>
        </div>
        <div className={style["menu-wrapper"]}>
          <div className={style["search-container"]}>
            {width > 1200 ? (
              <SearchBar />
            ) : width > 600 ? (
              <SearchOutlinedIcon
                className={style["search-icon"]}
                sx={{
                  stroke: "#ffffff",
                  strokeWidth: 1,
                  transform: "scale(1.1)",
                }}
                fontSize='large'
              />
            ) : null}
          </div>
          {width > 600 ? (
            <div>
              <NotificationsNoneOutlinedIcon
                className={style["notification-icon"]}
                sx={{
                  stroke: "#ffffff",
                  strokeWidth: 1,
                  transform: "scale(1.1)",
                }}
                fontSize='large'
              />
            </div>
          ) : null}
          <div
            className={style["avatar-container"]}
            onClick={handleProfileClick}
          >
            <div>
              <KeyboardArrowDownOutlinedIcon
                fontSize='large'
                sx={{
                  stroke: "#ffffff",
                  strokeWidth: 1,
                  transform: "scale(1.1)",
                }}
              />
            </div>
            <Avatar
              alt='profile img'
              src={profileImg}
              sx={{ width: 60, height: 60 }}
            />
          </div>
          <UserActions />
        </div>
      </nav>
    </div>
  );
};

export default Header;
