import {
  useState,
  MouseEvent,
  useContext,
  FormEvent,
  useEffect,
  ChangeEvent,
} from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {
  GlobalContext,
  GlobalContextType,
} from "../../../contexts/GlobalContext";
import useAuth from "../../../hooks/useAuth";
import useFirestore from "../../../hooks/useFirestore";
import InfoIcon from "@mui/icons-material/Info";

const modal = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  // const [error, setError] = useState("");

  const { modalOpen, toggleModalOpen } = useContext(
    GlobalContext
  ) as GlobalContextType;

  const { currentUser } = useAuth();
  const { updateData, error, setError, loading, setLoading } = useFirestore();

  const joinName = () => {
    if (firstName.length === 0 || lastName.length === 0) {
      setError("All fields required");
      return;
    }
    setFullName(firstName + " " + lastName);
  };

  const handleFirstNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFirstName(value);
    // setBtnDisabled(value !== "" && lastName !== "");
    value.length === 0 && lastName.length === 0
      ? setBtnDisabled(true)
      : setBtnDisabled(false);
  };

  const handleLastNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setLastName(value);

    // setBtnDisabled(firstName.length !== "" && value !== "");

    firstName.length === 0 && value.length === 0
      ? setBtnDisabled(true)
      : setBtnDisabled(false);
  };

  const data = {
    displayName: fullName,
  };

  useEffect(() => {
    loading ? console.log("loading...") : console.log("loading done");
  }, [loading]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    joinName();

    setError("");
    const collectionName = "users";
    const docId = currentUser?.uid;

    // console.log(error);

    // console.log(docId);
    // console.log(collectionName);
    console.log(fullName);
    // console.log(currentUser);

    // updateData({ currentUser, collectionName, data, docId });

    // toggleModalOpen();
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
            <label htmlFor='fname'>First Name</label>
            <input
              className='modal-input-field'
              type='text'
              id='fname'
              value={firstName}
              onChange={(e) => handleFirstNameInput(e)}
            />
          </div>
          <div className='modal-input-container'>
            <label htmlFor='lname'>Last Name</label>
            <input
              className='modal-input-field'
              type='text'
              id='lname'
              value={lastName}
              onChange={(e) => handleLastNameInput(e)}
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
