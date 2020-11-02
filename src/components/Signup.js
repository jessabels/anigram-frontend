import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./Login.css";
import { register } from "../store/authentication";

const Signup = () => {
  const token = useSelector((state) => state.authentication.token);
  const errors = useSelector((state) => state.authentication.errors);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const listOfErrors = errors
    ? errors.map((error) => (
        <li key={error} style={{ color: "red" }}>
          {error}
        </li>
      ))
    : null;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(register(username, password, email, confirmPassword));
  };
  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const updateConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
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
          name="username"
          type="username"
          placeholder="Username"
          value={username}
          onChange={updateUsername}
        />
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
        <label>Confirm Password:</label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Password"
          value={confirmPassword}
          onChange={updateConfirmPassword}
        />
        <Button type="submit">Sign Up</Button>
        <ul>{listOfErrors}</ul>
        <NavLink to="/login">Already have an account? Login Here</NavLink>
      </form>
    </div>
  );
};

export default Signup;
