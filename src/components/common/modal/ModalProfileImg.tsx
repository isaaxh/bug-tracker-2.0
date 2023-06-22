import { useEffect, useState } from "react";

const ModalProfileImg = () => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleFormSubmit = () => {};

  useEffect(() => {
    console.log(imageUpload);
  }, [imageUpload]);

  return (
    <form className='modal-content' onSubmit={handleFormSubmit}>
      <div className='modal-input-container'>
        <label htmlFor='upload-photo'>Upload Photo</label>
        <input
          className='modal-input-field'
          type='file'
          id='upload-photo'
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setImageUpload(file);
          }}
        />
      </div>
      <div className='modal-btn-container'>
        <button className='modal-btn' disabled={!btnDisabled}>
          Update
        </button>
      </div>
    </form>
  );
};

export default ModalProfileImg;
