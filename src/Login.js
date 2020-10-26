import React from "react";
import Button from "@material-ui/core/Button";

import Signup from "./Signup";
import "./Login.css";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className="form-container">
      <form className="loginForm">
        <label>Email:</label>
        <input name="email" />
        <label>Password:</label>
        <input type="password" name="password" />
        <Button>Login</Button>
        <Button>Demo Login</Button>

        <NavLink to="/signup">Don't have an account? Sign Up Here</NavLink>
      </form>
    </div>
  );
};

export default Login;
