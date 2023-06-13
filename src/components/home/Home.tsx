import { auth } from "../../firebase";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import style from "./home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const user = useAuth();

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style["logo-container"]}></div>
        <div className={style["avatar-container"]}></div>
      </div>
      <div className={style.body}>
        <div className={style.sidebar}></div>
        <div className={style["main-content"]}></div>
      </div>
      <h1>Home</h1>
      <div>name: {user?.displayName}</div>
      <div>email: {user?.email}</div>
      <Link to='/profile'>Profile</Link>
      <Link to='/tickets'>Tickets</Link>

      <div className='logout'>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
