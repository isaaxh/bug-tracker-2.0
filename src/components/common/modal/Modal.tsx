import { useContext } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {
  GlobalContext,
  GlobalContextType,
} from "../../../contexts/GlobalContext";
import useFirestore from "../../../hooks/useFirestore";
import InfoIcon from "@mui/icons-material/Info";
// import { AuthContext, AuthContextType } from "../../../contexts/AuthContext";
import ModalFullName from "./ModalFullName";
import ModalProfilePic from "./ModalProfileImg";

const Modal = () => {
  const { modalOpen, toggleModalOpen, clickedBtn } = useContext(
    GlobalContext
  ) as GlobalContextType;

  const { error } = useFirestore();

  return (
    <div
      className={modalOpen ? "modal-overlay" : "modal-closed"}
      onClick={toggleModalOpen}
    >
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h2 className='modal-title'>{clickedBtn}</h2>
          <span onClick={toggleModalOpen}>
            <ClearIcon
              className='modal-cross'
              sx={{ stroke: "#ffffff", strokeWidth: 1 }}
              fontSize='large'
            />
          </span>
        </div>
        {error && error !== "" ? (
          <div className='error-box'>
            <InfoIcon
              fontSize='large'
              style={{ color: "var(--color-error)" }}
            />
            {error}
          </div>
        ) : null}
        <>
          {clickedBtn === "Edit Full Name" ? (
            <ModalFullName />
          ) : clickedBtn === "Edit Profile Photo" ? (
            <ModalProfilePic />
          ) : null}
        </>
      </div>
    </div>
  );
};

export default Modal;
