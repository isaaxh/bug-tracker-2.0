import style from "./roleAssignment.module.css";

const RoleAssignment = () => {
  return (
    <div className={style.container}>
      <div className={style["title-container"]}>
        <h1 className={style.title}>Manage User Roles</h1>
      </div>
      <div className={style["content-container"]}>
        <div className={style["users-list-container"]}>List of users here</div>
        <div className={style["select-role-container"]}>
          Select role to assign here
        </div>
        <div className={style["Peronnel-list-container"]}>
          list of personnels here
        </div>
      </div>
    </div>
  );
};

export default RoleAssignment;
