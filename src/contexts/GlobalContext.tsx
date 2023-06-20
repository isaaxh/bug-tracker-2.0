import { ReactNode, createContext } from "react";
import { useToggle } from "../hooks/userToggle";

interface GlobalProvideProps {
  children: ReactNode;
}

export interface GlobalContextType {
  modalOpen: boolean;
  toggleModalOpen: () => void;
  subMenuOpen: boolean;
  toggleSubMenuOpen: () => void;
  tabMenuOpen: boolean;
  toggleTabMenuOpen: () => void;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalProvider = ({ children }: GlobalProvideProps) => {
  const { status: modalOpen, toggleStatus: toggleModalOpen } = useToggle();
  const { status: subMenuOpen, toggleStatus: toggleSubMenuOpen } = useToggle();
  const { status: tabMenuOpen, toggleStatus: toggleTabMenuOpen } = useToggle();

  const globalValues = {
    modalOpen,
    toggleModalOpen,
    subMenuOpen,
    toggleSubMenuOpen,
    tabMenuOpen,
    toggleTabMenuOpen,
  };

  return (
    <GlobalContext.Provider value={globalValues}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
