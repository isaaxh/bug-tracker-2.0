import "../../../styles/App.css";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { Portal } from "../portal/Portal";
import { usePopper } from "react-popper";
import { useState } from "react";

interface PopupProps {
  children: String | React.ReactNode;
  popupTrigger: boolean;
  popupContent: string | React.ReactNode;
}

const Popup = ({ children, popupTrigger, popupContent }: PopupProps) => {
  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: "arrow", options: { element: popperElement } },
      { name: "offset", options: { offset: [30, 5] } },
    ],
    placement: "bottom-start",
  });
  return (
    <div className="popup" ref={setReferenceElement}>
      <div className="popup-text">
        {children}
        {popupTrigger ? <GoChevronUp /> : <GoChevronDown />}
      </div>
      <Portal>
        {popupTrigger && (
          <ul
            className="popup-content"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            {popupContent}
          </ul>
        )}
      </Portal>
    </div>
  );
};

export default Popup;
