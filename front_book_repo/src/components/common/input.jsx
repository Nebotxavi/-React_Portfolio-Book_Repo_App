import React, { useState } from "react";

const Input = ({ name, label, type, error, value, handleChange }) => {
  const [showErrors, setShowErrors] = useState(false);

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
        onBlur={() => setShowErrors(true)}
      />
      {showErrors && error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
