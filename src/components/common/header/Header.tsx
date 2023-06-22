import style from "./header.module.css";
import { Avatar } from "@mui/material";
import img1 from "../../../assets/man-smiling.jpg";
import { useContext } from "react";
import useAuth from "../../../hooks/useAuth";
// import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  GlobalContext,
  GlobalContextType,
} from "../../../contexts/GlobalContext";
import { AuthContext, AuthContextType } from "../../../contexts/AuthContext";
import UserActions from "./UserActions";

const Header = () => {
  const { toggleSubMenuOpen } = useContext(GlobalContext) as GlobalContextType;

  const { currentUser } = useContext(AuthContext) as AuthContextType;

  const handleProfileClick = () => {
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
          <UserActions />
        </div>
      </nav>
    </div>
  );
};

export default Header;
