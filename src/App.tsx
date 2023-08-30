
import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/home/Home";
import Tickets from "./components/tickets/Tickets";
import Profile from "./components/profile/ProfileSettings";
import Projects from "./components/projects/Projects";
import SignIn from "./components/auth/signin/SignIn";
import SignUp from "./components/auth/signup/Signup";
import ResetPassword from "./components/auth/resetPass/ResetPassword";
import RoleAssignment from "./components/roleAssignment/RoleAssignment";
import ProjectUsers from "./components/ProjectUsers/ProjectUsers";
import Page404 from "./components/Page404";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import Layout from "./components/common/Layout";

function App() {
    return (
    <main className='App'>
        <Routes>
            {/* public routes */}
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='resetpass' element={<ResetPassword />} />
            <Route path='unauthorized' element={<Unauthorized />} />
            <Route element={<RequireAuth allowedRole={{admin: true}} key={location.pathname} />}>
                <Route path='role_assignment' element={<RoleAssignment />} />
            </Route>
            <Route element={<RequireAuth allowedRole={{manager: true, admin: true}} />}>
                <Route path='project_users' element={<ProjectUsers />} />
                <Route path='projects' element={<Projects />} />
            </Route> 
            <Route element={<RequireAuth allowedRole={{developer: true}} />}>
                <Route path='tickets' element={<Tickets />} />
                <Route path='/' element={<Home />} />
                <Route path='profile' element={<Profile />} />
            </Route>
            <Route path='*' element={<Page404 />} />
        </Routes>
    </main>
  );
}

export default App;
