import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { useFetchAuth } from "../hooks/useFetchAuth";

const Home = () => {
  const navigate = useNavigate();
  const user = useFetchAuth();

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
      {/* <AuthDetails /> */}
      <div>name: {user?.displayName}</div>
      <div className='logout'>
        <button onClick={logout}>Logout</button>A
      </div>
    </div>
  );
};

export default Home;
