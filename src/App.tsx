import { Route, Routes } from "react-router";
import "./App.css";
import ResponsiveAppBar from "./components/Nav";
import Home from "./components/Home";
import Tickets from "./components/Tickets";
import Profile from "./components/Profile";
import ClippedDrawer from "./components/SideBar";
import Login from "./components/auth/signin/SignIn";
import SignUp from "./components/auth/signup/Signup";
import ResetPassword from "./components/auth/resetPass/ResetPassword";
{
  /* <ResponsiveAppBar /> */
}
{
  /* <ClippedDrawer /> */
}

function App() {
  return (
    <div className='App'>
      <div className='body'>
        <div className='main-content'></div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='resetpass' element={<ResetPassword />} />
          <Route path='home' element={<Home />} />
          <Route path='Profile' element={<Profile />} />
          <Route path='Tickets' element={<Tickets />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
