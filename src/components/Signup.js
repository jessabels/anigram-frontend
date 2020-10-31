import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./Login.css";
import { register } from "../store/authentication";

const Signup = () => {
  const token = useSelector((state) => state.authentication.token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(register(username, password, email));
  };
  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };

  if (token) {
    return <Redirect to="/" />;
  }
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="loginForm">
        <label htmlFor="">Username:</label>
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={updateUsername}
        />
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
        <Button type="submit">Sign Up</Button>
        <NavLink to="/login">Already have an account? Login Here</NavLink>
      </form>
    </div>
  );
};

export default Signup;
