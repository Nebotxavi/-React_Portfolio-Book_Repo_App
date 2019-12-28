import React from "react";

const SearchBar = ({ query, setQuery, setCurrentGenre, setCurrentPage }) => {
  return (
    <div className="search-bar form-group">
      <input
        className="form-control"
        placeholder="Search here..."
        value={query}
        onChange={e => {
          setCurrentGenre("");
          setCurrentPage(1);
          setQuery(e.target.value.toLowerCase());
        }}
      />
    </div>
  );
};

export default SearchBar;
