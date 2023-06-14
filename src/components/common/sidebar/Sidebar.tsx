import React from "react";
import style from "./sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={style.container}>
      <ul className={style["tab-list"]}>
        <li className={style.tab}>
          <Link to='/home'>Dashboard</Link>
        </li>
        <li className={style.tab}>
          <Link to='/home'>Profile Settings</Link>
        </li>
        <li className={style.tab}>
          <Link to='/home'>
            <div>Tickets</div>
            {/* Tickets */}
          </Link>
        </li>
        <li className={style.tab}>
          <Link to='/home'>Projects</Link>
        </li>
        <li className={style.tab}>
          <Link to='/home'>Issues</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
