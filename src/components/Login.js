import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { NavLink, Redirect } from "react-router-dom";

import "./Login.css";
import { login } from "../store/authentication";
// import { getUserInfo } from "./store/user";

const Login = () => {
  const token = useSelector((state) => state.authentication.token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="loginForm">
        <label>Email:</label>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <Button type="submit">Login</Button>
        <Button>Demo Login</Button>

        <NavLink to="/signup">Don't have an account? Sign Up Here</NavLink>
      </form>
    </div>
  );
};

export default Login;
