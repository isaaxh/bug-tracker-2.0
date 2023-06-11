import { Route, Routes } from "react-router";
import "./App.css";
import ResponsiveAppBar from "./components/Nav";
import Home from "./components/Home";
import Tickets from "./components/Tickets";
import Profile from "./components/Profile";

function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='Profile' element={<Profile />} />
        <Route path='Tickets' element={<Tickets />} />
      </Routes>
    </div>
  );
}

export default App;
