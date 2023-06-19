import { useState, MouseEvent } from "react";
import ClearIcon from "@mui/icons-material/Clear";

const modal = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {};

  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='modal-header'>
          <h2 className='modal-title'>Edit Full Name</h2>
          <span>
            <ClearIcon
              //   className={style.cross}
              sx={{ stroke: "#ffffff", strokeWidth: 1 }}
              fontSize='large'
            />
          </span>
        </div>
        {/* <div > */}
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
        {/* </div> */}
      </div>
    </div>
  );
};

export default modal;
