import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./Login.css";

const Login = () => {
  return (
    <div className="form-container">
      <form className="loginForm">
        <label htmlFor="">Username:</label>
        <input name="username" />
        <label>Email:</label>
        <input name="email" />
        <label>Password:</label>
        <input type="password" name="password" />
        <Button>Sign Up</Button>
        <NavLink to="/login">Already have an account? Login Here</NavLink>
      </form>
    </div>
  );
};

export default Login;
