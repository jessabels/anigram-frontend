import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: "#48c0b5",
  },
}));

const Navbar = () => {
  const avatar = useSelector((state) => state.authentication.avatar);
  const user = useSelector((state) => state.authentication.username);

  const classes = useStyles();
  return (
    <div className="navbar-container">
      <AppBar className={classes.navbar} position="static">
        <Toolbar>
          <div className="logo-info">
            <FontAwesomeIcon
              icon={faLeaf}
              style={{ color: "#4aa532" }}
            ></FontAwesomeIcon>
            <Button>Anigram</Button>
          </div>
          {user && avatar ? (
            <div className="user-info" style={{ display: "flex" }}>
              <Avatar alt="user avatar" src={avatar}></Avatar>
              {/* <span>{user}</span> */}
              <Button>Logout</Button>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
