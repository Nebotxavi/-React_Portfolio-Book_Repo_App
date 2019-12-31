import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { Route, Switch, Redirect } from "react-router-dom";

import Books from "./components/books";
import BookForm from "./components/bookForm";
import { getCurrentUser } from "./services/authService";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import NavBar from "./components/navBar";
import NotFound from "./components/common/notFound";
import ProtectedRoute from "./components/common/protectedRoute";
import RegisterForm from "./components/registerForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const username = getCurrentUser();
    setUser(username);
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar user={user} />
      <div className="content">
        <Switch>
          <ProtectedRoute path="/book/:id" component={BookForm} />
          <Route
            path="/books"
            render={props => <Books {...props} user={user} />}
          />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterForm} />
          <Redirect from="/" exact to="books" />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
