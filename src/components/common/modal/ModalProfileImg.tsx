import { FormEvent, useEffect, useState } from "react";
import useStorage from "../../../hooks/useStorage";
import useAuth from "../../../hooks/useAuth";

const ModalProfileImg = () => {
  const [imgUpload, setImgUpload] = useState<File | null>(null);
  // const [btnDisabled, setBtnDisabled] = useState(true);

  const { uploadImg, loading } = useStorage();
  const { currentUser } = useAuth();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser || !imgUpload) {
      console.log("Eithe user or img not available");
      return;
    }

    uploadImg({ currentUser, imgUpload });
  };

  useEffect(() => {
    if (imgUpload !== null) {
      // setBtnDisabled(false);
    }
    console.log(imgUpload);
  }, [imgUpload]);

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
            setImgUpload(file);
          }}
        />
      </div>
      <div className='modal-btn-container'>
        <button className='modal-btn' disabled={loading}>
          Update
        </button>
      </div>
    </form>
  );
};

export default ModalProfileImg;
