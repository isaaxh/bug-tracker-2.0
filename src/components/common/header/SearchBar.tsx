import React, { ChangeEvent, useState } from "react";
import style from "./header.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchBtnClick = () => {};
  return (
    <form>
      <label className={style["search-container"]} htmlFor='search-bar'>
        <div
          className={style["search-btn-container"]}
          onClick={handleSearchBtnClick}
        >
          <SearchOutlinedIcon
            className={style["search-icon"]}
            sx={{ stroke: "#ffffff", strokeWidth: 0.5 }}
            fontSize='large'
          />
        </div>
        <input
          className={style["search-bar"]}
          type='text'
          id='search-bar'
          placeholder='Search here'
          onChange={handleInputChange}
          value={searchInput}
        />
      </label>
    </form>
  );
};

export default SearchBar;
