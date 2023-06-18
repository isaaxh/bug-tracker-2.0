import { useState } from "react";
import style from "./roleAssignment.module.css";

// interface usersData {}

const RoleAssignment = () => {
  const [users, setUsers] = useState([
    {
      name: "tom hidleston",
      email: "tomh@gmail.com",
      role: "admin",
    },
    {
      name: "Carol smith",
      email: "carolsmith@gmail.com",
      role: "manager",
    },
    {
      name: "Carol smith",
      email: "tomh@gmail.com",
      role: "project lead",
    },
    {
      name: "Carol smith",
      email: "tomh@gmail.com",
      role: "developer",
    },
  ]);
  const [roles, setRoles] = useState([
    "admin",
    "manager",
    "project lead",
    "developer",
  ]);

  // const handleSelectChange = (e) => {
  //   let options = e.target.options;
  // };

  return (
    <div className={style.container}>
      <div className={style["title-container"]}>
        <h1 className={style.title}>Manage User Roles</h1>
      </div>
      <div className={style["content-container"]}>
        <div className={style["input-container"]}>
          <form action='#' className={style.form}>
            <div className={style["select-user-container"]}>
              <label className={style["user-list-label"]} htmlFor='user-list'>
                Select 1 or more users
              </label>
              <select
                className={style["user-list"]}
                name='user-list'
                id='user-list'
                multiple
                size={3}
                required
                autoFocus
              >
                {users.map((user, index) => (
                  <option
                    className={style["select-items"]}
                    key={index}
                    value={user.name}
                  >
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <hr className={style["hr"]} />
            <div className={style["select-role-container"]}>
              <label className={style["user-list-label"]} htmlFor='role-list'>
                Select the Role to assign
              </label>
              <select
                className={style["role-list"]}
                name='role-list'
                id='role-list'
                required
                autoFocus
              >
                <option disabled value=''>
                  --Choose one please--
                </option>
                {roles.map((role, index) => (
                  <option
                    className={style["select-items"]}
                    key={index}
                    value={role}
                  >
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <button className={style["btn-submit"]}>Submit</button>
          </form>
        </div>
        <div className={style["output-container"]}>
          <table>
            <caption>Your Personnel</caption>

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td data-cell='name'>{user.name}</td>
                  <td data-cell='email'>{user.email}</td>
                  <td data-cell='role'>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoleAssignment;
