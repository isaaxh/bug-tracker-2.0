import { auth } from "../../firebase";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import style from "./home.module.css";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import img1 from "../../assets/man-smiling.jpg";
import Sidebar from "../common/sidebar/Sidebar";

const Home = () => {
  const [userInitial, setUserInitial] = useState("");

  const navigate = useNavigate();
  const user = useAuth();

  // useEffect(() => {
  //   const getUserInitials = (name: string) => {
  //     let userInitial: string = "";
  //     userInitial = name;

  //     console.log(userInitial);

  //     // setUserInitial(userInitial);
  //   };

  //   getUserInitials(user.displayName);
  // }, [user]);

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={style.container}>
      <div className={style.body}>
        {/* <div className={style.sidebar}><Sidebar /></div> */}
        <div className={style["main-content"]}>
          <h1>Home</h1>
          <div>name: {user?.displayName}</div>
          <div>email: {user?.email}</div>
          <Link to='/profile'>Profile</Link>
          <Link to='/tickets'>Tickets</Link>
          <div className='logout'>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
