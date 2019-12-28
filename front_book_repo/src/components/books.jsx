import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Redirect } from "react-router-dom";

import BooksTable from "./booksTable";
import FilterMenu from "./common/filterMenu";
import NewButton from "./common/newButton";
import Pagination from "./common/pagination";
import SearchBar from "./common/searchBar";
import Summary from "./summary";

import { getBooks, deleteBook } from "../services/booksService";
import { getGenres } from "../services/genresService";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";

const Books = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [currentGenre, setCurrentGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [query, setQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({
    path: "title",
    order: "asc"
  });
  const [isExpired, setIsExpired] = useState(false);

  const pageSize = 4;
  const { booksToRender, totalCount } = getPagedData();
  const filteredBooks = getFilteredBooks();

  useEffect(() => {
    let shouldIgnore = false;
    async function fetchData() {
      try {
        const genres = await getGenres();
        if (!shouldIgnore) {
          setGenres([{ name: "All Genres" }, ...genres]);
        }
        const books = await getBooks();
        if (!shouldIgnore) {
          setBooks(books);
        }
      } catch (ex) {
        if (ex.response && ex.response.status === 401) setIsExpired(true);
      }
    }
    fetchData();
    return () => {
      shouldIgnore = true;
    };
  }, []);

  useEffect(() => {
    function correctPage() {
      if (
        currentPage > 1 &&
        filteredBooks.length === pageSize * currentPage - pageSize
      )
        setCurrentPage(currentPage => currentPage - 1);
    }
    correctPage();
  }, [books, currentPage, filteredBooks]);

  if (isExpired) return <Redirect to="/logout" />;

  async function handleDelete({ id }) {
    const originalBooks = books;
    const updatedBooks = originalBooks.filter(book => book.id !== id);
    setBooks(updatedBooks);

    try {
      await deleteBook(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This book has already been removed.");
      }
      setBooks(originalBooks);
    }
  }

  function getFilteredBooks() {
    return currentGenre && currentGenre.id
      ? books.filter(book => book.genre === currentGenre.name)
      : query
      ? books.filter(book => book.title.toLowerCase().startsWith(query))
      : books;
  }

  function getSortedBooks(books) {
    return _.orderBy(books, [sortColumn.path], [sortColumn.order]);
  }

  function getPagedData() {
    const filteredBooks = getFilteredBooks();
    const sortedBooks = getSortedBooks(filteredBooks);
    return {
      booksToRender: paginate(sortedBooks, currentPage, pageSize),
      totalCount: filteredBooks.length
    };
  }

  return (
    <div className="row">
      <div className="col-2">
        <FilterMenu
          items={genres}
          currentItem={currentGenre}
          handleClick={setCurrentGenre}
          setCurrentPage={setCurrentPage}
          setQuery={setQuery}
        />
      </div>
      <div className="col">
        {user && <NewButton />}
        <Summary count={totalCount} />
        <SearchBar
          query={query}
          setQuery={setQuery}
          setCurrentPage={setCurrentPage}
          setCurrentGenre={setCurrentGenre}
        />
        <BooksTable
          books={booksToRender}
          sortColumn={sortColumn}
          setSortColumn={setSortColumn}
          handleDelete={handleDelete}
        />
        <Pagination
          pageSize={pageSize}
          itemsAmount={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Books;
