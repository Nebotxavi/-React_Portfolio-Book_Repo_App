import React, { useState } from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

import Form from "./common/form";
import { login, getCurrentUser } from "../services/authService";

const LoginForm = ({ location }) => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  if (getCurrentUser()) return <Redirect to="/" />;

  const schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    email: Joi.string().allow(""),
    password: Joi.string()
      .required()
      .label("Password")
  };

  const inputList = [
    {
      name: "username",
      label: "Username",
      value: user.username,
      element: "Input"
    },
    {
      name: "password",
      label: "Password",
      value: user.password,
      element: "Input",
      type: "password"
    },
    { label: "Login", element: "button" }
  ];

  async function doSubmit() {
    try {
      await login(user);
      const { state } = location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status <= 500
      ) {
        setErrors({ ...errors, username: ex.response.data.detail });
      }
    }
  }

  return (
    <Form
      inputList={inputList}
      data={user}
      setData={setUser}
      errors={errors}
      setErrors={setErrors}
      schema={schema}
      doSubmit={doSubmit}
    />
  );
};

export default LoginForm;
