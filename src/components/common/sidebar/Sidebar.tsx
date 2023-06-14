import React from "react";
import style from "./sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={style.container}>
      <ul className={style["tab-list"]}>
        <li className={style.tab}>
          <Link to='/'>Dashboard</Link>
        </li>
        <li className={style.tab}>
          <Link to='/projects'>
            <div>Projects</div>
          </Link>
        </li>
        <li className={style.tab}>
          <Link to='/tickets'>
            <div>Tickets</div>
          </Link>
        </li>
        <li className={style.tab}>
          <Link to='/profile'>Profile Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
