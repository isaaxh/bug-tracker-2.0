import { useState } from "react";

const ModalProfilePic = () => {
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleFormSubmit = () => {};

  return (
    <form className='modal-content' onSubmit={handleFormSubmit}>
      <div className='modal-input-container'>
        <label htmlFor='first_name'>First Name</label>
        <input
          className='modal-input-field'
          type='text'
          id='first_name'
          autoComplete='off'
        />
      </div>
      <div className='modal-btn-container'>
        <button className='modal-btn' disabled={btnDisabled}>
          Update
        </button>
      </div>
    </form>
  );
};

export default ModalProfilePic;
