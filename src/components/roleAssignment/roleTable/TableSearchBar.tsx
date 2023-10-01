import { useState } from "react";
import style from "../roleAssignment.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

interface TableSearchBarProps {
  searchTable: (newSearchValue: string) => void;
}

const TableSearchBar = ({ searchTable }: TableSearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchTable(searchValue);
  };
  return (
    <form className={style["table-header"]} onSubmit={submitForm}>
      <h2>All Users</h2>
      <div className={style["search-container"]}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">
          <SearchOutlinedIcon
            className={style["search-icon"]}
            sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
          />
        </button>
      </div>
    </form>
  );
};

export default TableSearchBar;
