import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";

import { getBook, updateBook, saveBook } from "../services/booksService";
import { getGenres } from "../services/genresService";
import Form from "./common/form";

const BookForm = ({ history, match: itemRef }) => {
  const [book, setBook] = useState({
    title: "",
    author_first_name: "",
    author_second_name: "",
    rate: "",
    genre: ""
  });
  const [genres, setGenres] = useState([]);
  const [errors, setErrors] = useState({});
  const urlId = itemRef.params.id;
  const isNew = urlId === "new" ? true : false;
  const [isExpired, setIsExpired] = useState(false);

  const inputList = [
    { name: "title", label: "Title", value: book.title, element: "Input" },
    {
      name: "author_first_name",
      label: "Name",
      value: book.author_first_name,
      element: "Input"
    },
    {
      name: "author_second_name",
      label: "Second Name",
      value: book.author_second_name,
      element: "Input"
    },
    { name: "rate", label: "Rate", value: book.rate, element: "Input" },
    {
      name: "genre",
      label: "Genre",
      value: book.genre,
      element: "Select"
    },
    { label: "Save", element: "Button" }
  ];

  useEffect(() => {
    let shouldIgnore = false;

    async function fetchGenres() {
      try {
        const genres = await getGenres();
        if (!shouldIgnore) setGenres(genres);
      } catch (ex) {
        if (ex.response && ex.response.status === 401) setIsExpired(true);
      }
    }

    async function fetchBook() {
      try {
        const book = await getBook(urlId);
        if (!shouldIgnore) setBook(mapToState(book));
      } catch (ex) {
        if (ex.response && ex.response.status === 401) setIsExpired(true);
      }
    }

    fetchGenres();
    if (!isNew) fetchBook();
    return () => {
      shouldIgnore = true;
    };
  }, [isNew, urlId]);

  if (isExpired) return <Redirect to="/logout" />;

  function mapToState(book) {
    return {
      id: book.id,
      title: book.title,
      author_first_name: book.author_first_name,
      author_second_name: book.author_second_name,
      rate: book.rate,
      genre: book.genre
    };
  }

  const schema = {
    id: Joi.number(),
    title: Joi.string()
      .required()
      .label("Title"),
    author_first_name: Joi.string().allow(""),
    author_second_name: Joi.string().allow(""),
    rate: Joi.number()
      .min(1)
      .max(10)
      .required(),
    genre: Joi.string().required()
  };

  function mapToFetchApi() {
    const genreId = genres
      .filter(genre => genre.name === book.genre)
      .map(genre => genre.id)[0];
    return { ...book, genre: genreId };
  }

  async function doSubmit() {
    try {
      const mappedBook = mapToFetchApi();
      if (!isNew) await updateBook(book.id, mappedBook);
      else await saveBook(mappedBook);
      history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 401) setIsExpired(true);
    }
  }

  const loaderStyle = {
    position: "absolute",
    textAlign: "center",
    width: "100%",
    top: "20%"
  };

  return (
    <React.Fragment>
      <Loader
        type="Circles"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={1500}
        style={loaderStyle}
      />
      <Form
        inputList={inputList}
        data={book}
        setData={setBook}
        errors={errors}
        setErrors={setErrors}
        genres={genres}
        schema={schema}
        doSubmit={doSubmit}
      />
    </React.Fragment>
  );
};

export default BookForm;
