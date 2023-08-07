import useAuth from "../../hooks/useAuth";
import style from "./home.module.css";
import { useEffect, useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import { DocumentData } from "firebase/firestore";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Home = () => {
  const [userData, setUserData] = useState<DocumentData>();
  const { width } = useWindowDimensions();
  const { currentUser } = useAuth();

  const { readDoc, error } = useFirestore();

  useEffect(() => {
    if (currentUser?.uid === undefined) return;

    const queryRequestData = {
      collectionName: "users",
      uid: currentUser.uid,
    };

    const fetchData = async () => {
      const userData = await readDoc(queryRequestData);
      setUserData(userData);
    };

    fetchData();
  }, [currentUser]);

  return (
    <div className={style.container}>
      <div className={style["page-title-container"]}>
        {width > 1200 ? <h1 className={style.title}>Dashboard</h1> : null}
      </div>
      <div className={style["content-container"]}>
        <div>name: {currentUser?.displayName}</div>
        <div>email: {currentUser?.email}</div>
        <div>{userData && userData.roles}</div>
        <div>{error}</div>
      </div>
    </div>
  );
};

export default Home;
