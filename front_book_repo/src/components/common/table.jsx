import React from "react";

import TableHead from "./tableHead";
import TableBody from "./tableBody";

const Table = ({ items, columns, sortColumn, setSortColumn }) => {
  return (
    <table className="table">
      <TableHead
        columns={columns}
        setSortColumn={setSortColumn}
        sortColumn={sortColumn}
      />
      <TableBody items={items} columns={columns} />
    </table>
  );
};

export default Table;
