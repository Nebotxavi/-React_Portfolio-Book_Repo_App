import React from "react";
import { Link } from "react-router-dom";

const NewButton = () => {
  return (
    <Link to="/book/new">
      <button type="button" className="btn btn-primary">
        New book
      </button>
    </Link>
  );
};

export default NewButton;
