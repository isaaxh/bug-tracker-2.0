import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const useAuth = () => {
  return useContext(GlobalContext);
};

export default useAuth;
