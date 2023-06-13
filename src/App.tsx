import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/home/Home";
import Tickets from "./components/Tickets";
import Profile from "./components/Profile";
import SignIn from "./components/auth/signin/SignIn";
import SignUp from "./components/auth/signup/Signup";
import ResetPassword from "./components/auth/resetPass/ResetPassword";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <div className='App'>
      <div className='body'>
        <div className='main-content'></div>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='resetpass' element={<ResetPassword />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='home' element={<Home />} />
            <Route path='profile' element={<Profile />} />
            <Route path='tickets' element={<Tickets />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
