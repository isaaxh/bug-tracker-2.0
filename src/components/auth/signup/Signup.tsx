import { useState } from "react";
import style from "../authPage.module.css";
import LanguageIcon from "@mui/icons-material/Language";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
// import useFirestore, { writeData } from "../../../hooks/useFirestore";
import useAuth from "../../../hooks/useAuth";

interface userDataProps {
  displayName: string;
  email: string;
  role: roleProps;
  password: string;
  confirmPassword: string;
}

interface roleProps {
  admin: boolean;
  manager: boolean;
  developer: boolean;
}

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [role, SetRole] = useState<roleProps>({
    admin: false,
    manager: false,
    developer: false,
  });
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { signUp, loading, error, setError } = useAuth();

  const userData: userDataProps = {
    email,
    role: role,
    password,
    confirmPassword,
    displayName,
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

          <form
            className={style.form}
            onSubmit={(e) => signUp({ e, userData })}
          >
            <div className={style["input-container"]}>
              <label htmlFor='name'>Name</label>
              <input
                className={style["input-field"]}
                type='text'
                id='name'
                value={displayName}
                onChange={(e) => {
                  setError("");
                  setDisplayName(e.target.value);
                }}
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
              />
            </div>
            <div className={style["input-container"]}>
              <label htmlFor='role'>Role</label>
              <select
                className={style["input-field"]}
                name='role'
                id='role'
                defaultValue={"default"}
                onChange={(e) => {
                  switch (e.target.value) {
                    case "default":
                      setError("Please choose a role");
                      break;
                    case "manager":
                      setError("");
                      SetRole({
                        admin: false,
                        manager: true,
                        developer: false,
                      });
                      break;
                    case "developer":
                      setError("");
                      SetRole({
                        admin: false,
                        manager: false,
                        developer: true,
                      });
                      break;
                    default:
                      break;
                  }
                }}
              >
                <option value='default' disabled>
                  Choose here
                </option>
                <option value='manager'>Project Manager</option>
                <option value='developer'>Developer</option>
              </select>
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
