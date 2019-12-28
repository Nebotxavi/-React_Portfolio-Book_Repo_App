import React from "react";

// Defaut props should be rewritten according to the needs.

const FilterMenu = ({
  items,
  currentItem,
  handleClick,
  setCurrentPage,
  setQuery,
  ref = "name",
  id = "id"
}) => {
  return (
    <ul className="list-group clickable">
      {items.map(item => {
        const style = item[ref] === currentItem[ref] ? "active" : "";
        return (
          <li
            key={item[id] || item[ref]}
            className={`list-group-item ${style}`}
            onClick={() => {
              setCurrentPage(1);
              setQuery("");
              handleClick(item);
            }}
          >
            {item[ref]}
          </li>
        );
      })}
    </ul>
  );
};

export default FilterMenu;
