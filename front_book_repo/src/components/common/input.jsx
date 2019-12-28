import React from "react";

const Input = ({ name, label, type, error, value, handleChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={`input-${name}`}>{label}</label>
      <input
        id={`input-${name}`}
        type={type}
        name={name}
        className="form-control"
        value={value}
        onChange={handleChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
