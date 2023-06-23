import style from "./header.module.css";
import { Avatar } from "@mui/material";
import img1 from "../../../assets/man-smiling.jpg";
import { useContext, useState } from "react";
import useAuth from "../../../hooks/useAuth";
// import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  GlobalContext,
  GlobalContextType,
} from "../../../contexts/GlobalContext";
import { AuthContext, AuthContextType } from "../../../contexts/AuthContext";
import UserActions from "./UserActions";

const Header = () => {
  // const { currentUser } = useAuth();
  const { toggleUserActionsOpen } = useContext(
    GlobalContext
  ) as GlobalContextType;

  const { profileImg } = useContext(AuthContext) as AuthContextType;

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
          <div
            className={style["avatar-container"]}
            onClick={handleProfileClick}
          >
            {/* <KeyboardArrowDownOutlinedIcon fontSize='large' /> */}
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
