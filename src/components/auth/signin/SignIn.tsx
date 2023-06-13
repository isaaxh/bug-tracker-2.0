import { useState, FormEvent } from "react";
import style from "../authPage.module.css";
import LanguageIcon from "@mui/icons-material/Language";
import InfoIcon from "@mui/icons-material/Info";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import BarLoader from "react-spinners/BarLoader";

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const signIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (email === "" || password === "") {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/home");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
      setLoading(false);
    }

    // .then((userCredential) => {
    //   console.log(userCredential);
    // })
    // .catch((error) => {
    // });
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
          <div className={style["loader-container"]}>
            <BarLoader
              loading={loading}
              aria-label='Loading Spinner'
              data-testid='loader'
              // color='#8e8e8e'
            />
          </div>
        ) : (
          <>
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

              <form className={style.form} onSubmit={signIn}>
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
                <div className={style["btn-container"]}>
                  <button
                    className={`${style.btn} ${style["btn-auth"]}`}
                    type='submit'
                  >
                    Sign In
                  </button>
                </div>
                <div className={style["alternate-option-container"]}>
                  <Link
                    to={"/resetpass"}
                    style={{ textDecoration: "underline" }}
                  >
                    Forgot password?
                  </Link>
                </div>
              </form>
              <div className={style["hr-container"]}>
                <hr /> or <hr />
              </div>
              <div className={style["btn-container"]}>
                <Link to={"/signup"} style={{ width: "100%" }}>
                  <button
                    className={`${style.btn} ${style["btn-create"]}`}
                    type='button'
                  >
                    Create Account
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;
