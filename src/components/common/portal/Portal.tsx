import { createPortal } from "react-dom";
import { ReactNode } from "react";

interface PortalProps {
  children: ReactNode;
}

export const Portal = ({ children }: PortalProps) => {
  return createPortal(children, document.body);
};
