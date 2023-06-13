import { auth } from "../firebase";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/");
        console.log("user logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Home</h1>
      <div className='logout'>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
