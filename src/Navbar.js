import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";
import { logout } from "./store/authentication";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Navbar = () => {
  const avatar = useSelector((state) => state.authentication.avatar);
  const user = useSelector((state) => state.authentication.username);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  const classes = useStyles();
  return (
    <div className="navbar-container">
      <AppBar className={classes.navbar} position="static">
        <Toolbar className={classes.navbar}>
          <div className="logo-info">
            <FontAwesomeIcon
              icon={faLeaf}
              style={{ color: "#4aa532" }}
            ></FontAwesomeIcon>
            <Link style={{ textDecoration: "none" }} to="/">
              <Button>Anigram</Button>
            </Link>
          </div>
          {user ? (
            <div className="user-info" style={{ display: "flex" }}>
              <Link to="/profile">
                <Avatar alt="user avatar" src={avatar}></Avatar>
              </Link>
              <Button style={{ marginLeft: "30px" }} onClick={handleSubmit}>
                Logout
              </Button>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
