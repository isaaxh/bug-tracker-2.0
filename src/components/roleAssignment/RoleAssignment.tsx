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
        <div className={style["select-users-container"]}>
          <form action='#'>
            <div className='select-users'>
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
                {users.map((user) => (
                  <option className={style["users-items"]}>{user.name}</option>
                ))}
              </select>
            </div>
            <div className='select-role'>Select role to assign here</div>
          </form>
        </div>
        {/* <div className={style["select-role-container"]}> */}
        {/* </div> */}
        <div className={style["Peronnel-list-container"]}>
          list of personnels here
        </div>
      </div>
    </div>
  );
};

export default RoleAssignment;
