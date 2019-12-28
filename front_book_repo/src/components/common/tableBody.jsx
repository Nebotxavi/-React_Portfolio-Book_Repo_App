import React from "react";

const TableBody = ({ items, columns }) => {
  function renderCell(item, column) {
    if (column.content) return column.content(item);
    return item[column.path] ? item[column.path] : item[column.key];
  }

  return (
    <tbody>
      {items.map((item, ind) => {
        return (
          <tr key={ind}>
            {columns.map(column => (
              <td key={item.id + (column.path || column.key)}>
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
