import { ReactNode, createContext, useState } from "react";
import { useToggle } from "../hooks/useToggle";

interface GlobalProvideProps {
  children: ReactNode;
}

export interface GlobalContextType {
  modalOpen: boolean;
  toggleModalOpen: () => void;
  tabMenuOpen: boolean;
  toggleTabMenuOpen: () => void;
  userActionsOpen: boolean;
  toggleUserActionsOpen: () => void;
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  modalTitle: string;
  setModalTitle: React.Dispatch<React.SetStateAction<string>>;
  /* getCurrentTab: ({ links }: getCurrentTabPropsType) => void; */
}

export interface getCurrentTabPropsType {
  links: tabLink[];
}

type tabLink = {
  title: string;
  path: string;
  icon: JSX.Element;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalProvider = ({ children }: GlobalProvideProps) => {
  const { status: modalOpen, toggleStatus: toggleModalOpen } = useToggle();
  const { status: userActionsOpen, toggleStatus: toggleUserActionsOpen } =
    useToggle();
  const { status: tabMenuOpen, toggleStatus: toggleTabMenuOpen } = useToggle();
  const [currentTab, setCurrentTab] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  /* const getCurrentTab = ({ links }: getCurrentTabPropsType) => { */
  /*   const currentTab = links.filter( */
  /*     (link) => link.path === window.location.pathname, */
  /*   ); */
  /*   setCurrentTab(currentTab[0]?.title); */
  /* }; */

  const globalValues = {
    modalOpen,
    toggleModalOpen,
    userActionsOpen,
    toggleUserActionsOpen,
    tabMenuOpen,
    toggleTabMenuOpen,
    currentTab,
    setCurrentTab,
    modalTitle,
    setModalTitle,
    /* getCurrentTab, */
  };

  return (
    <GlobalContext.Provider value={globalValues}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
