import { Avatar } from "@mui/material";
import img1 from "../../../assets/man-smiling.jpg";
import style from "./header.module.css";

const Header = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style["logo-container"]}>
          <h1 className='app-title'>Bug Tracker 2.0</h1>
        </div>
        <div className={style["avatar-container"]}>
          <Avatar alt='man smiling' src={img1} sx={{ width: 60, height: 60 }} />
        </div>
      </div>
    </div>
  );
};

export default Header;
