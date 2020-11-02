import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { NavLink, Redirect } from "react-router-dom";

import "./Login.css";
import { login } from "../store/authentication";
// import { getUserInfo } from "./store/user";

const Login = () => {
  const token = useSelector((state) => state.authentication.token);
  const errors = useSelector((state) => state.authentication.errors);
  const [email, setEmail] = useState("demo@demo.com");
  const [password, setPassword] = useState("123");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
    // dispatch(getUserInfo(token));
  };
  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const listOfErrors = errors
    ? errors.map((error) => (
        <li key={error} style={{ color: "red" }}>
          {error}
        </li>
      ))
    : null;

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="loginForm">
        <label>Email:</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
        <label>Password:</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <Button type="submit">Login</Button>
        <ul>{listOfErrors}</ul>
        <NavLink to="/signup">Don't have an account? Sign Up Here</NavLink>
      </form>
    </div>
  );
};

export default Login;
