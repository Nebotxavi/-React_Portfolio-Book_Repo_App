import React from "react";
import Joi from "joi-browser";

import Input from "./input";
import Select from "./select";

const Form = ({
  inputList,
  data,
  setData,
  errors,
  setErrors,
  genres,
  schema,
  doSubmit
}) => {
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const propertySchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, propertySchema);

    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const allErrors = errors;
    const errorMessage = validateProperty(input);
    if (errorMessage) allErrors[input.name] = errorMessage;
    else delete allErrors[input.name];

    setErrors(allErrors);
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    doSubmit();
  };

  const renderButton = label => {
    return (
      <button
        type="submit"
        key={label}
        className="btn btn-primary"
        disabled={validate()}
      >
        {label}
      </button>
    );
  };

  const renderElement = ({ name, label, value, type, element }) => {
    if (element === "Input")
      return (
        <Input
          name={name}
          label={label}
          type={type}
          value={value}
          error={errors[name]}
          key={name}
          handleChange={handleChange}
        />
      );
    else if (element === "Select")
      return (
        <Select
          name={name}
          label={label}
          value={value}
          options={genres}
          error={errors[name]}
          key={name}
          handleChange={handleChange}
        />
      );
    else return renderButton(label);
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      {inputList.map(inputs => renderElement(inputs))}
    </form>
  );
};

export default Form;
