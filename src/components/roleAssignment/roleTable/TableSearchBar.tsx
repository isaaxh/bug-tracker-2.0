import style from "../roleAssignment.module.css";

const TableSearchBar = () => {
  return (
    <div>
      <div className={style["table-header"]}>
        <h2>All Users</h2>
        <div className={style["search-container"]}>
          <input placeholder="Search users" />
          <button type="button">Search</button>
        </div>
      </div>
    </div>
  );
};

export default TableSearchBar;
