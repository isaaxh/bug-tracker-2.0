import { useState } from "react";
import style from "./roleAssignment.module.css";

// interface usersData {}

const RoleAssignment = () => {
  const [users, setUsers] = useState([
    {
      name: "tom hidleston",
    },
    {
      name: "John smith",
    },
    {
      name: "Carol smith",
    },
    {
      name: "Carol smith",
    },
    {
      name: "Carol smith",
    },
    {
      name: "Carol smith",
    },
    {
      name: "Carol smith",
    },
    {
      name: "Carol smith",
    },
    {
      name: "Carol smith",
    },
    {
      name: "Carol smith",
    },
    {
      name: "Carol smith",
    },
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
                  <option className={style["user-items"]} key={index}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={style["select-role-container"]}>
              Select role to assign here
            </div>
          </form>
        </div>
        <div className={style["output-container"]}>
          <div className='table'>list of personnels here</div>
        </div>
      </div>
    </div>
  );
};

export default RoleAssignment;
