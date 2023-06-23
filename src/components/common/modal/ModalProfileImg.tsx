import { FormEvent, useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
// import BarLoader from "react-spinners/BarLoader";
import useStorage from "../../../hooks/useStorage";
import useAuth from "../../../hooks/useAuth";
import MoonLoader from "react-spinners/MoonLoader";

const ModalProfileImg = () => {
  const [imgUpload, setImgUpload] = useState<File | null>(null);
  // const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  // const [btnDisabled, setBtnDisabled] = useState(true);

  const { uploadImg, loading, success, error, setError } = useStorage();
  const { currentUser } = useAuth();

  const handleUploadCross = () => {
    setImgUpload(null);
    console.log("img removed");
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser || !imgUpload) {
      setError("Please select an Image");
      return;
    }

    uploadImg({ currentUser, imgUpload });

    setImgUpload(null);
  };

  useEffect(() => {
    if (imgUpload !== null) {
      setError("");
      setMessage(imgUpload.name);
      return;
    }
    setMessage("");
  }, [imgUpload]);

  return (
    <form className='modal-content' onSubmit={handleFormSubmit}>
      <div className='modal-input-container'>
        {error && error ? (
          <div className='modal-message-card'>
            <InfoIcon
              fontSize='large'
              style={{ color: "var(--color-error)" }}
            />
            <span style={{ color: "var(--color-error)" }}>{error}</span>
          </div>
        ) : message && message ? (
          <div className='modal-message-card'>
            <InfoIcon fontSize='large' style={{ color: "var(--color-info)" }} />
            <span style={{ color: "var(--color-info)" }}>{message}</span>
            <span
              className='upload-cross-container'
              onClick={handleUploadCross}
            >
              <CloseOutlinedIcon
                className='upload-cross'
                sx={{ stroke: "#ffffff", strokeWidth: 1 }}
              />
            </span>
          </div>
        ) : success && success ? (
          <div className='modal-message-card'>
            <CheckCircleOutlineOutlinedIcon
              fontSize='large'
              style={{ color: "var(--color-success)" }}
            />
            <span style={{ color: "var(--color-success)" }}>{success}</span>
          </div>
        ) : loading && loading ? (
          <div className='modal-message-card'>
            <MoonLoader
              loading={loading}
              aria-label='Loading Spinner'
              data-testid='loader'
              size={15}
            />
            <span style={{ marginLeft: "1rem" }}>Uploading...</span>
          </div>
        ) : null}

        <label htmlFor='upload-photo' className='upload-img'>
          <UploadOutlinedIcon
            className='upload-icon'
            fontSize='large'
            sx={{ stroke: "#ffffff", strokeWidth: 1 }}
          />
          Upload Photo
        </label>
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
