import { useState } from "react";
import style from "./Login.module.css";
import LanguageIcon from "@mui/icons-material/Language";
import InfoIcon from "@mui/icons-material/Info";

const Login = () => {
  const [error, setError] = useState<string>("");
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
          <h1 className={style["card-title"]}>Sign In</h1>
          {error && error ? (
            <div className={style["error-card"]}>
              <InfoIcon
                fontSize='large'
                style={{ color: "var(--color-error)" }}
              />
              {error}
            </div>
          ) : null}

          <form className={style.form} onSubmit={() => {}}>
            <div className={style["input-container"]}>
              <label htmlFor='email'>Email</label>
              <input className={style["input-field"]} type='email' id='email' />
            </div>
            <div className={style["input-container"]}>
              <label htmlFor='password'>Password</label>
              <input
                className={style["input-field"]}
                type='text'
                id='password'
              />
            </div>
            <div className={style["btn-container"]}>
              <button
                className={`${style.btn} ${style["btn-next"]}`}
                type='button'
              >
                Next
              </button>
            </div>
            <div className={style["forgot-pass-container"]}>
              <a href='#'>Forgot password?</a>
            </div>
          </form>
          <div className={style["hr-container"]}>
            <hr /> or <hr />
          </div>
          <div className={style["btn-container"]}>
            <button
              className={`${style.btn} ${style["btn-create"]}`}
              type='button'
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
