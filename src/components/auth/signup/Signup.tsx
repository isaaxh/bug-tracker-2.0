import { FormEvent, useEffect, useState } from "react";
import style from "../authPage.module.css";
import LanguageIcon from "@mui/icons-material/Language";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import useAuth, { userDataType } from "../../../hooks/useAuth";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const { signUp, loading, error, setError } = useAuth();

  const validateInputValues = () => {
    if (
      firstName.length !== 0 &&
      lastName.length !== 0 &&
      password.length !== 0 &&
      confirmPassword.length !== 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  const userData: userDataType = {
    email: email,
    roles: {
        developer: true,
    },
    roleAssigned: false,
    password: password,
    confirmPassword: confirmPassword,
    displayName: firstName + " " + lastName,
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp({ userData });
  };

  useEffect(() => {
    validateInputValues();
  }, [firstName, lastName, email, password, confirmPassword]);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className='app-title'>BugTracker 2.0</h1>
        <h1>
          <LanguageIcon fontSize='large' />
        </h1>
      </div>
      <div className={style.body}>
        {loading ? (
          <div className='loader-container'>
            <BarLoader
              loading={loading}
              aria-label='Loading Spinner'
              data-testid='loader'
            />
          </div>
        ) : null}
        <div className={style.card}>
          <h1 className={style["card-title"]}>Create an Account</h1>
          {error && error ? (
            <div className={style["error-card"]}>
              <InfoIcon
                fontSize='large'
                style={{ color: "var(--color-error)" }}
              />
              {error}
            </div>
          ) : null}

          <form className={style.form} onSubmit={handleFormSubmit}>
            <div className={style["input-container"]}>
              <label htmlFor='first-name'>First Name</label>
              <input
                className={style["input-field"]}
                type='text'
                id='first-name'
                value={firstName}
                onChange={(e) => {
                  setError("");
                  setFirstName(e.target.value);
                }}
                autoComplete='off'
              />
            </div>
            <div className={style["input-container"]}>
              <label htmlFor='last-name'>Last Name</label>
              <input
                className={style["input-field"]}
                type='text'
                id='last-name'
                value={lastName}
                onChange={(e) => {
                  setError("");
                  setLastName(e.target.value);
                }}
                autoComplete='off'
              />
            </div>
            <div className={style["input-container"]}>
              <label htmlFor='email'>Email</label>
              <input
                className={style["input-field"]}
                type='email'
                id='email'
                value={email}
                onChange={(e) => {
                  setError("");
                  setEmail(e.target.value);
                }}
                autoComplete='off'
              />
            </div>
            <div className={style["input-container"]}>
              <label htmlFor='password'>Password</label>
              <input
                className={style["input-field"]}
                type='password'
                id='password'
                value={password}
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                }}
                autoComplete='off'
              />
            </div>
            <div className={style["input-container"]}>
              <label htmlFor='confirm-password'>Confirm Password</label>
              <input
                className={style["input-field"]}
                type='password'
                id='confirm-password'
                value={confirmPassword}
                onChange={(e) => {
                  setError("");
                  setConfirmPassword(e.target.value);
                }}
                autoComplete='off'
              />
            </div>
            <div className={style["btn-container"]}>
              <button
                className={`${style.btn} ${style["btn-auth"]}`}
                type='submit'
                disabled={btnDisabled}
              >
                Sign Up
              </button>
            </div>
            <div className={style["alternate-option-container"]}>
              Already have an account?
              <Link to={"/"} style={{ textDecoration: "underline" }}>
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
