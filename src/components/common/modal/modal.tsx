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
    if (firstName === "" || lastName === "") {
      setError("All fields required");
      return;
    }
    setFullName(firstName + " " + lastName);
  };

  const validateInputValues = () => {
    if (firstName.length !== 0 && lastName.length !== 0) {
      console.log("validation");

      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  useEffect(() => {
    validateInputValues();
  }, [firstName, lastName]);

  const data = {
    displayName: fullName,
  };

  useEffect(() => {
    loading ? console.log("loading...") : console.log("loading done");
  }, [loading]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    validateInputValues();

    joinName();

    setError("");
    // const collectionName = "users";
    // const docId = currentUser?.uid;

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
