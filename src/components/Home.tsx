import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

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
    <div>
      <h1>Home</h1>
      {/* <AuthDetails /> */}
      <div>name: {user?.displayName}</div>
      <div>email: {user?.email}</div>
      <div className='logout'>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
