import SignIn from "./components/auth/signin/SignIn";
import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";
import Layout from "./components/common/Layout";
import useFirestore from "./hooks/useFirestore";
import { DocumentData } from "firebase/firestore";

const getAuthStatus = () => {
  const [authLoaded, setAuthLoaded] = useState<boolean>(false);
  const { readDoc } = useFirestore();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<DocumentData>();
  const [currentUserRole, setCurrentUserRole] = useState();

  useEffect(() => {
    if (!currentUser) {
      setAuthLoaded(false);
      return;
    }

    const queryRequestData = {
      collectionName: "users",
      uid: currentUser.uid,
    };

    setAuthLoaded(true);
    // console.log(currentUser);

    const fetchUserData = async () => {
      const userData = await readDoc(queryRequestData);
      setUserData(userData);
      setCurrentUserRole(userData && userData.role);
    };

    fetchUserData();

    // console.log(userData && userData.role);
  }, [currentUser]);

  return { authLoaded, currentUserRole };
};

const ProtectedRoutes = () => {
  const { authLoaded: isAuth, currentUserRole } = getAuthStatus();

  // console.log(currentUserRole && currentUserRole.admin);

  // return isAuth

  return isAuth ? <Layout /> : <SignIn />;
};

export default ProtectedRoutes;
