import style from "./roleAssignment.module.css";
import RoleTable from "./roleTable/RoleTable";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const RoleAssignment = () => {
  const { width } = useWindowDimensions();

  return (
    <div className={style.container}>
      <div className={style["title-container"]}>
        {width > 1200 ? (
          <h1 className={style.title}>Manage User Roles</h1>
        ) : null}
      </div>
      <div className={style["content-container"]}>
        <RoleTable />
      </div>
    </div>
  );
};

export default RoleAssignment;
