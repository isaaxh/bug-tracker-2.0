import { useState, MouseEvent, useContext } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {
  GlobalContext,
  GlobalContextType,
} from "../../../contexts/GlobalContext";

const modal = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { modalOpen, toggleModalOpen } = useContext(
    GlobalContext
  ) as GlobalContextType;

  return (
    <div
      className={modalOpen ? "modal-overlay" : "modal-closed"}
      onClick={toggleModalOpen}
    >
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h2 className='modal-title'>Edit Full Name</h2>
          <span onClick={toggleModalOpen}>
            <ClearIcon
              //   className={style.cross}
              sx={{ stroke: "#ffffff", strokeWidth: 1 }}
              fontSize='large'
            />
          </span>
        </div>
        <form className='modal-content' action='#'>
          <div className='modal-input-container'>
            <label htmlFor='fname'>First Name</label>
            <input className='modal-input-field' type='text' id='fname' />
          </div>
          <div className='modal-input-container'>
            <label htmlFor='lname'>Last Name</label>
            <input className='modal-input-field' type='text' id='lname' />
          </div>
          <div className='modal-btn-container'>
            <button className='modal-btn'>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default modal;
