import { auth } from "../../firebase";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import style from "./home.module.css";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import img1 from "../../assets/man-smiling.jpg";
import Sidebar from "../common/sidebar/Sidebar";
import useFirestore from "../../hooks/useFirestore";
import { DocumentData } from "firebase/firestore";

interface userData {
  displayName: string;
  email: string;
  role: string;
  uid: string;
}

const Home = () => {
  const [userData, setUserData] = useState<DocumentData>();
  const { currentUser } = useAuth();

  const { readData } = useFirestore();
  // const userDetails =

  useEffect(() => {
    if (currentUser?.uid === undefined) return;

    const queryRequestData = {
      collectionName: "users",
      uid: currentUser.uid,
    };
    readData(queryRequestData)
      .then((response) => setUserData(response))
      .catch((error) => {
        console.log(error);
      });
  }, [currentUser]);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Dashboard</h1>
      <div>name: {currentUser?.displayName}</div>
      <div>email: {currentUser?.email}</div>
      <div>Role: {userData?.role}</div>
      <Link to='/profile'>Profile</Link>
      <Link to='/tickets'>Tickets</Link>
    </div>
  );
};

export default Home;
