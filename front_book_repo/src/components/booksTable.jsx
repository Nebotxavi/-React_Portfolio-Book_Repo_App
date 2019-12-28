import React from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

const BooksTable = ({ books, sortColumn, setSortColumn, handleDelete }) => {
  const columns = [
    {
      path: "title",
      label: "Title",
      content: book => <Link to={`/book/${book.id}`}>{book.title}</Link>
    },
    { path: "author_first_name", label: "Author name" },
    { path: "author_second_name", label: "Author second name" },
    { path: "genre", label: "Genre" },
    { path: "rate", label: "Rate" },
    {
      key: "Delete",
      content: book => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(book)}
        >
          Delete
        </button>
      )
    }
  ];

  return (
    <Table
      items={books}
      columns={columns}
      setSortColumn={setSortColumn}
      sortColumn={sortColumn}
    />
  );
};

export default BooksTable;
