import React from "react";

const Select = ({ name, label, options, error, value, handleChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={`input-${name}`}>{label}</label>
      <select
        id={`input-${name}`}
        name={name}
        className="form-control"
        onChange={handleChange}
        value={value}
      >
        <option value="">-- Select one --</option>
        {options.map(option => (
          <option value={option.name} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
