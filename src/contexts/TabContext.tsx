import { ReactNode, createContext, useEffect, useState } from "react";
import style from "../components/common/sidebar/sidebar.module.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import { AuthContextType, Roles } from "./AuthContext";
import useAuth from "../hooks/useAuth";

const sidebarLinks = [
  {
    title: "Dashboard",
    path: "/",
    icon: (
      <HomeOutlinedIcon
        className={style.icons}
        sx={{ stroke: "#ffffff", strokeWidth: 1 }}
        fontSize="large"
      />
    ),
  },
  {
    title: "Role Assignment",
    path: "/role_assignment",
    icon: (
      <GroupAddOutlinedIcon
        className={style.icons}
        sx={{ stroke: "#ffffff", strokeWidth: 1 }}
        fontSize="large"
      />
    ),
  },
  {
    title: "Project Users",
    path: "/project_users",
    icon: (
      <PeopleOutlineOutlinedIcon
        className={style.icons}
        sx={{ stroke: "#ffffff", strokeWidth: 1 }}
        fontSize="large"
      />
    ),
  },
  {
    title: "Projects",
    path: "/projects",
    icon: (
      <BusinessCenterOutlinedIcon
        className={style.icons}
        sx={{ stroke: "#ffffff", strokeWidth: 1 }}
        fontSize="large"
      />
    ),
  },
  {
    title: "Tickets",
    path: "/tickets",
    icon: (
      <ConfirmationNumberOutlinedIcon
        className={style.icons}
        sx={{ stroke: "#ffffff", strokeWidth: 1 }}
        fontSize="large"
      />
    ),
  },
];

interface TabProvideProps {
  children: ReactNode;
}

export interface TabContextType {
  authorizedTabs: tabLink[];
  loading: boolean;
}

type getCurrentTabPropsType = {
  links: tabLink[];
};

type tabLink = {
  title: string;
  path: string;
  icon: JSX.Element;
};

export const TabContext = createContext<TabContextType | null>(null);

const TabProvider = ({ children }: TabProvideProps) => {
  const [authorizedTabs, setAuthorizedTabs] = useState<tabLink[]>(sidebarLinks);
  const { currentUserData } = useAuth() as AuthContextType;

  const [loading, setLoading] = useState(true);

  const filterAuthorizedTabs = () => {
    const filteredLinks = sidebarLinks.filter((link) => {
      if (currentUserData?.roles?.admin) return true;

      if (currentUserData?.roles?.manager && link.path !== "/role_assignment")
        return true;

      if (
        currentUserData?.roles?.developer &&
        link.path !== "/role_assignment" &&
        link.path !== "/project_users"
      )
        return true;

      if (currentUserData?.roles?.user && link.path === "/") return true;
    });

    setLoading(false);
    return filteredLinks;
  };

  useEffect(() => {
    if (!currentUserData) {
      setLoading(true);
      return;
    }

    setAuthorizedTabs(filterAuthorizedTabs());
    setLoading(false);
  }, [currentUserData]);

  /* const getCurrentTab = ({ links }: getCurrentTabPropsType) => { */
  /*   const currentTab = links.filter( */
  /*     (link) => link.path === window.location.pathname, */
  /*   ); */
  /*   setCurrentTab(currentTab[0]?.title); */
  /* }; */

  /* if (loading) { */
  /*   return <div>loading...</div>; */
  /* } */

  const tabValues = {
    authorizedTabs,
    loading,
  };

  return (
    <TabContext.Provider value={tabValues}>{children}</TabContext.Provider>
  );
};

export default TabProvider;
