import { Route, Routes } from "react-router";
import "./styles/App.css";
import Home from "./components/home/Home";
import Tickets from "./components/tickets/Tickets";
import Profile from "./components/profile/ProfileSettings";
import Projects from "./components/projects/Projects";
import SignIn from "./components/auth/signin/SignIn";
import SignUp from "./components/auth/signup/SignUp";
import ResetPassword from "./components/auth/resetPass/ResetPassword";
import RoleAssignment from "./components/roleAssignment/RoleAssignment";
import ProjectUsers from "./components/projectUsers/ProjectUsers";
import Page404 from "./components/Page404";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";

function App() {
  return (
    <main className="App">
      <Routes>
        {/* public routes */}
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="resetpass" element={<ResetPassword />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route
          element={
            <RequireAuth
              allowedRole={{ admin: true }}
              key={location.pathname}
            />
          }
        >
          <Route path="role_assignment" element={<RoleAssignment />} />
        </Route>
        <Route
          element={<RequireAuth allowedRole={{ manager: true, admin: true }} />}
        >
          <Route path="project_users" element={<ProjectUsers />} />
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRole={{ developer: true, manager: true, admin: true }}
            />
          }
        >
          <Route path="projects" element={<Projects />} />
        </Route>
        <Route element={<RequireAuth allowedRole={{ submitter: true }} />}>
          <Route path="tickets" element={<Tickets />} />
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </main>
  );
}

export default App;
