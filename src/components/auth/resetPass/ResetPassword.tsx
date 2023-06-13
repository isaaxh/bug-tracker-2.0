import { useState, FormEvent } from "react";
import style from "../authPage.module.css";
import LanguageIcon from "@mui/icons-material/Language";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";

const ResetPassword = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  // const [btnStatus, setBtnStatus] = useState<boolean>(true);

  const sendResetEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (email === "") {
      setError("Please enter email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Please check your email");
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className='app-title'>BugTracker 2.0</h1>
        <h1>
          <LanguageIcon fontSize='large' />
        </h1>
      </div>
      <div className={style.body}>
        <div className={style.card}>
          <h1 className={style["card-title"]}>Reset Password</h1>
          <>
            {error && error ? (
              <div className={style["error-card"]}>
                <InfoIcon
                  fontSize='large'
                  style={{ color: "var(--color-error)" }}
                />
                {error}
              </div>
            ) : null}
            {success && success ? (
              <div className={style["success-card"]}>
                <InfoIcon
                  fontSize='large'
                  style={{ color: "var(--color-success)" }}
                />
                {success}
              </div>
            ) : null}
          </>

          <form className={style.form} onSubmit={sendResetEmail}>
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
              />
            </div>
            <div className={style["btn-container"]}>
              <button
                className={`${style.btn} ${style["btn-auth"]}`}
                type='submit'
              >
                Send Reset Email
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

export default ResetPassword;
