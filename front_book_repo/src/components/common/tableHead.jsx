import React from "react";

const TableHead = ({ columns, sortColumn, setSortColumn }) => {
  function handleSort(newPath) {
    const order =
      sortColumn.path !== newPath
        ? "asc"
        : sortColumn.order === "asc"
        ? "desc"
        : "asc";
    const path = newPath;
    setSortColumn({ path, order });
  }

  function renderSortIcon(column) {
    return sortColumn.path !== column.path ? (
      ""
    ) : sortColumn.order === "asc" ? (
      <i className="fa fa-caret-down"></i>
    ) : (
      <i className="fa fa-caret-up"></i>
    );
  }

  return (
    <thead>
      <tr>
        {columns.map((column, ind) => {
          return (
            <th
              className="clickable"
              key={column.label || column.key}
              onClick={() => handleSort(column.path)}
            >
              {column.label}
              {renderSortIcon(column)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
