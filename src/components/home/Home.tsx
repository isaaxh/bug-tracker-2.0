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
  const { currentUser } = useAuth();
  const navigate = useNavigate();

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
      <h1 className={style.title}>Dashboard</h1>
      <div>name: {currentUser?.displayName}</div>
      <div>email: {currentUser?.email}</div>
      <Link to='/profile'>Profile</Link>
      <Link to='/tickets'>Tickets</Link>
    </div>
  );
};

export default Home;
