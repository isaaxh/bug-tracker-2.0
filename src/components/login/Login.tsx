import style from "./Login.module.css";
import LanguageIcon from "@mui/icons-material/Language";

const Login = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>BugTracker 2.0</h1>
        <h1>
          <LanguageIcon fontSize='large' />
        </h1>
      </div>
      <div className={style.body}>
        <div className={style.card}>
          <form onSubmit={() => {}}>
            <h1>Sign In</h1>
            <div className={style["input-container"]}>
              <label htmlFor='input'>Email</label>
              <input className={style["input-field"]} type='text' id='input' />
            </div>
            <div className={style["btn-container"]}>
              <button className={style["btn-login"]} type='button'>
                Next
              </button>
            </div>
            <a>Forgot password?</a>
          </form>
          <div className={style["hr-container"]}>
            <hr /> or <hr />
          </div>
          <div className={style["btn-container"]}>
            <button className={style["btn-create"]} type='button'>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
