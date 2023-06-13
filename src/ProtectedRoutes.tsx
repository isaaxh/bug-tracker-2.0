import { Outlet } from "react-router";
import SignIn from "./components/auth/signin/SignIn";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoutes = () => {
  const user = useAuth();
  return <>{user && user ? <Outlet /> : <SignIn />}</>;
};

export default ProtectedRoutes;
