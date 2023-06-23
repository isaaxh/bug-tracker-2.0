import React, { useState } from "react";
import style from "./header.module.css";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleInputChange = () => {};
  return (
    <>
      <input
        className={style["search-bar"]}
        type='text'
        placeholder='Search here'
        onChange={handleInputChange}
        value={searchInput}
      />
    </>
  );
};

export default SearchBar;
