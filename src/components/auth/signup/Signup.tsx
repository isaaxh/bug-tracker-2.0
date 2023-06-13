import { useState, FormEvent } from "react";
import style from "../authPage.module.css";
import LanguageIcon from "@mui/icons-material/Language";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const signUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password don't match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/home");
      })
      .catch((error) => {
        setError("Something went wrong");
      });

    setSuccess("Account created Successfully");
  };
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={style.title}>BugTracker 2.0</h1>
        <h1>
          <LanguageIcon fontSize='large' />
        </h1>
      </div>
      <div className={style.body}>
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

          <form className={style.form} onSubmit={signUp}>
            <div className={style["input-container"]}>
              <label htmlFor='email'>Email</label>
              <input
                className={style["input-field"]}
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </div>
            <div className={style["btn-container"]}>
              <button
                className={`${style.btn} ${style["btn-auth"]}`}
                type='submit'
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
