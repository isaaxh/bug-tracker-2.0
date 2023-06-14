import { Avatar } from "@mui/material";
import img1 from "../../assets/man-smiling.jpg";

const Header = () => {
  return (
    <div className='container'>
      <div className='header'>
        <div className='logo-container'>
          <h1 className='app-title'>Bug Tracker 2.0</h1>
        </div>
        <div className='avatar-container'>
          <Avatar alt='man smiling' src={img1} sx={{ width: 60, height: 60 }} />
        </div>
      </div>
    </div>
  );
};

export default Header;
