import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/home/Home";
import Tickets from "./components/tickets/Tickets";
import Profile from "./components/profile/ProfileSettings";
import Projects from "./components/projects/Projects";
import SignIn from "./components/auth/signin/SignIn";
import SignUp from "./components/auth/signup/Signup";
import ResetPassword from "./components/auth/resetPass/ResetPassword";
import ProtectedRoutes from "./ProtectedRoutes";
import RoleAssignment from "./components/roleAssignment/RoleAssignment";
import ProjectUsers from "./components/ProjectUsers/ProjectUsers";
import GlobalProvider from "./contexts/GlobalContext";

function App() {
  return (
    <div className='App'>
      <GlobalProvider>
        <Routes>
          <Route path='singin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='resetpass' element={<ResetPassword />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='role_assignment' element={<RoleAssignment />} />
            <Route path='project_users' element={<ProjectUsers />} />
            <Route path='projects' element={<Projects />} />
            <Route path='tickets' element={<Tickets />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </GlobalProvider>
    </div>
  );
}

export default App;
