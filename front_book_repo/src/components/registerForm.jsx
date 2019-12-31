import React, { useState } from "react";
import Joi from "joi-browser";

import { register } from "../services/userServices";
import Form from "./common/form";

const RegisterForm = ({ history }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    emailConfirmation: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    emailConfirmation: Joi.string()
      .required()
      .email()
      .label("Mail confirmation"),
    password: Joi.string()
      .regex(/^[\w!.-]{5,30}$/)
      .required()
      .label("Password")
      .error(() => {
        return {
          message:
            "Password must contain at least 5 alphanumeric characters and/or the following special characters: !_-."
        };
      })
  };

  const inputList = [
    {
      name: "username",
      label: "Username",
      value: user.username,
      element: "Input"
    },
    { name: "email", label: "Email", value: user.email, element: "Input" },
    {
      name: "emailConfirmation",
      label: "Email confirmation",
      value: user.emailConfirmation,
      element: "Input"
    },
    {
      name: "password",
      label: "Password",
      value: user.password,
      element: "Input",
      type: "password"
    },
    { label: "Submit", element: "Button" }
  ];

  async function doSubmit() {
    try {
      await register(user);
      history.push("/login");
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status <= 500
      ) {
        const exResponse = Object.entries(ex.response.data);
        let newErrors = {};

        for (let exception of exResponse) {
          newErrors[exception[0]] = exception[1][0];
        }

        setErrors({ ...errors, ...newErrors });
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

export default RegisterForm;
