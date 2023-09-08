import useAuth from "../../hooks/useAuth";
import style from "./home.module.css";
import { useEffect, useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import { DocumentData } from "firebase/firestore";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { AuthContextType } from "../../contexts/AuthContext";

const Home = () => {
  const [userData, setUserData] = useState<DocumentData>();
  const { width } = useWindowDimensions();
  const { currentUser } = useAuth() as AuthContextType;

  const { readDoc, error } = useFirestore();

  useEffect(() => {
    if (currentUser?.uid === undefined) return;

    const queryRequestData = {
      collectionName: "users",
      uid: currentUser.uid,
    };

    const fetchData = async () => {
      try {
        const userData = await readDoc(queryRequestData);
        setUserData(userData);
      } catch (error) {
        console.log("Error fetching user data:" + error);
      }
    };

    fetchData();
  }, [currentUser]);

  const getRole = (userData: DocumentData) => {
    if (userData.roles.admin) {
      return "admin";
    } else if (userData.roles.manager) {
      return "Manager";
    } else if (userData.roles.developer) {
      return "developer";
    } else {
      return "unassigned";
    }
  };

  return (
    <div className={style.container}>
      <div className={style["page-title-container"]}>
        {width > 1200 ? <h1 className={style.title}>Dashboard</h1> : null}
      </div>
      <div className={style["content-container"]}>
        <div>name: {currentUser?.displayName}</div>
        <div>email: {currentUser?.email}</div>
        <div>role: {userData && getRole(userData)}</div>
      </div>
    </div>
  );
};

export default Home;
