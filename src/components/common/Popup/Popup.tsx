import "../../../styles/App.css";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { Portal } from "../portal/Portal";
import { usePopper } from "react-popper";
import { useState } from "react";

interface PopupProps {
  children: String | React.ReactNode;
  popupTrigger: boolean;
  listItems: listItem[];
  onRoleSelect: (role: string) => void;
}

type listItem = {
  id: string;
  name: string;
  color: string;
};

const Popup = ({
  children,
  popupTrigger,
  listItems,
  onRoleSelect,
}: PopupProps) => {
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
            onClick={(e) => e.stopPropagation()}
          >
            {listItems.map((item) => (
              <li
                key={item.id}
                className="popup-list-item"
                style={{
                  backgroundColor:
                    item.color !== "" ? "rgba(var(--color-grey-50))" : "",
                }}
                onClick={() => onRoleSelect(item.id)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </Portal>
    </div>
  );
};

export default Popup;
