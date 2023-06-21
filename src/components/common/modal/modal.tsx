import { useState, useContext, FormEvent, useEffect, ChangeEvent } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {
  GlobalContext,
  GlobalContextType,
} from "../../../contexts/GlobalContext";
import useFirestore from "../../../hooks/useFirestore";
import InfoIcon from "@mui/icons-material/Info";
import { AuthContext, AuthContextType } from "../../../contexts/AuthContext";

const modal = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [firstChange, setFirstChange] = useState(false);

  const { modalOpen, toggleModalOpen } = useContext(
    GlobalContext
  ) as GlobalContextType;

  const { currentUser } = useContext(AuthContext) as AuthContextType;

  const { updateData, error, setError } = useFirestore();

  const joinName = () => {
    if (firstName === "" || lastName === "") {
      setError("All fields required");
      return;
    }

    setFullName(firstName + " " + lastName);
  };

  const validateInputValues = () => {
    if (
      firstName.length !== 0 &&
      lastName.length !== 0 &&
      firstChange === true
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstChange(true);
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstChange(true);
    setLastName(e.target.value);
  };

  useEffect(() => {
    validateInputValues();
    if (firstName === "" || lastName === "") return;
    joinName();
  }, [firstName, lastName]);

  const data = {
    displayName: fullName,
  };

  useEffect(() => {
    const retrieveUserName = () => {
      if (currentUser === null || currentUser.displayName == null) return;

      const arrName = currentUser.displayName.split(" ");

      setFirstName(arrName[0]);
      setLastName(arrName[1]);
    };

    retrieveUserName();
  }, [currentUser]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    validateInputValues();

    joinName();

    setError("");

    if (currentUser === null) return;

    const collectionName = "users";
    const docId = currentUser.uid;

    updateData({ currentUser, collectionName, data, docId });

    toggleModalOpen();
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

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
        <form className='modal-content' onSubmit={handleFormSubmit}>
          <div className='modal-input-container'>
            <label htmlFor='first_name'>First Name</label>
            <input
              className='modal-input-field'
              type='text'
              id='first_name'
              autoComplete='off'
              value={firstName}
              onChange={(e) => handleFirstNameChange(e)}
            />
          </div>
          <div className='modal-input-container'>
            <label htmlFor='last_name'>Last Name</label>
            <input
              className='modal-input-field'
              type='text'
              id='last_name'
              autoComplete='off'
              value={lastName}
              onChange={(e) => handleLastNameChange(e)}
            />
          </div>
          <div className='modal-btn-container'>
            <button className='modal-btn' disabled={btnDisabled}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default modal;
