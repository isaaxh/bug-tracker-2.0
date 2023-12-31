import { useState } from "react";
import style from "../authPage.module.css";
import LanguageIcon from "@mui/icons-material/Language";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import useAuth from "../../../hooks/useAuth";
import { AuthContextType } from "../../../contexts/AuthContext";

interface demoUserData {
  email: string;
  password: string;
}

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [demoUser, setDemoUser] = useState<demoUserData>({
    email: "johndoe@gmail.com",
    password: "Aa123456",
  });

  const { signIn, loading, error, setError } = useAuth() as AuthContextType;

  const fillDemoUserCredential = () => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className="app-title">BugTracker 2.0</h1>
        <h1>
          <LanguageIcon fontSize="large" />
        </h1>
      </div>
      <div className={style.body}>
        {loading ? (
          <div className="loader-container">
            <BarLoader
              loading={loading}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : null}
        <div className={style.card}>
          <h1 className={style["card-title"]}>Sign In</h1>
          {error && error ? (
            <div className={style["error-card"]}>
              <InfoIcon
                fontSize="large"
                style={{ color: "var(--color-error)" }}
              />
              {error}
            </div>
          ) : null}

          <form
            className={style.form}
            onSubmit={(e) => signIn({ e, email, password })}
          >
            <div className={style["input-container"]}>
              <label htmlFor="email">Email</label>
              <input
                className={style["input-field"]}
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setError("");
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className={style["input-container"]}>
              <label htmlFor="password">Password</label>
              <input
                className={style["input-field"]}
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className={style["btn-container"]}>
              <button
                className={`${style.btn} ${style["btn-auth"]}`}
                type="submit"
              >
                Sign In
              </button>
            </div>
            <div className={style["alternate-option-container"]}>
              <Link to={"/resetpass"} style={{ textDecoration: "underline" }}>
                Forgot password?
              </Link>
            </div>
            <div className={style["demo-user-container"]}>
              <a
                className={style["demo-user-link"]}
                onClick={fillDemoUserCredential}
              >
                demo user
              </a>
            </div>
          </form>
          <div className={style["hr-container"]}>
            <hr /> or <hr />
          </div>
          <div className={style["btn-container"]}>
            <Link to={"/signup"} style={{ width: "100%" }}>
              <button
                className={`${style.btn} ${style["btn-create"]}`}
                type="button"
              >
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
