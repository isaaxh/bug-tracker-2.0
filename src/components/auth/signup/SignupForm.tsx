import { FormEvent } from "react";
import style from "../authPage.module.css";

const SignupForm = ({}) => {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {};
  return (
    <form className={style.form} onSubmit={handleFormSubmit}>
      <div className={style["input-container"]}>
        <label htmlFor="first-name">First Name</label>
        <input
          className={style["input-field"]}
          type="text"
          id="first-name"
          value={firstName}
          onChange={(e) => {
            setError("");
            setFirstName(e.target.value);
          }}
          autoComplete="off"
        />
      </div>
      <div className={style["input-container"]}>
        <label htmlFor="last-name">Last Name</label>
        <input
          className={style["input-field"]}
          type="text"
          id="last-name"
          value={lastName}
          onChange={(e) => {
            setError("");
            setLastName(e.target.value);
          }}
          autoComplete="off"
        />
      </div>
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
          autoComplete="off"
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
          autoComplete="off"
        />
      </div>
      <div className={style["input-container"]}>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          className={style["input-field"]}
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => {
            setError("");
            setConfirmPassword(e.target.value);
          }}
          autoComplete="off"
        />
      </div>
      <div className={style["btn-container"]}>
        {loading ? (
          <div>loading...</div>
        ) : (
          <button
            className={`${style.btn} ${style["btn-auth"]}`}
            type="submit"
            disabled={btnDisabled}
          >
            Sign Up
          </button>
        )}
      </div>
      <div className={style["alternate-option-container"]}>
        Already have an account?
        <Link to={"/signin"} style={{ textDecoration: "underline" }}>
          Log in
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
