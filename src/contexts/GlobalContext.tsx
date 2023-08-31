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
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalProvider = ({ children }: GlobalProvideProps) => {
  const { status: modalOpen, toggleStatus: toggleModalOpen } = useToggle();
  const { status: userActionsOpen, toggleStatus: toggleUserActionsOpen } = useToggle();
  const { status: tabMenuOpen, toggleStatus: toggleTabMenuOpen } = useToggle();
  const [ currentTab, setCurrentTab ] = useState("");


  const globalValues = {
    modalOpen,
    toggleModalOpen,
    userActionsOpen,
    toggleUserActionsOpen,
    tabMenuOpen,
    toggleTabMenuOpen,
    currentTab,
    setCurrentTab,
  };

  return (
    <GlobalContext.Provider value={globalValues}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
