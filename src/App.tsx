import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/home/Home";
import Tickets from "./components/tickets/Tickets";
import Profile from "./components/profile/Profile";
import Projects from "./components/projects/Projects";
import SignIn from "./components/auth/signin/SignIn";
import SignUp from "./components/auth/signup/Signup";
import ResetPassword from "./components/auth/resetPass/ResetPassword";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/singin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='resetpass' element={<ResetPassword />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Home />} />
          <Route path='projects' element={<Projects />} />
          <Route path='tickets' element={<Tickets />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
