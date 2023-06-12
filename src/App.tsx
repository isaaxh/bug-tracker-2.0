import { Route, Routes } from "react-router";
import "./App.css";
import ResponsiveAppBar from "./components/Nav";
import Home from "./components/Home";
import Tickets from "./components/Tickets";
import Profile from "./components/Profile";
import ClippedDrawer from "./components/SideBar";

function App() {
  return (
    <div className='App'>
      {/* <ResponsiveAppBar /> */}
      <div className='body'>
        {/* <ClippedDrawer /> */}
        <div className='main-content'></div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='Profile' element={<Profile />} />
          <Route path='Tickets' element={<Tickets />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
