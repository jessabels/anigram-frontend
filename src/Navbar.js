import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: "#9dffb0",
  },

  icon: {
    color: "#4aa532",
  },
}));

const Navbar = () => {
  // const avatar = useSelector((state) => state.userDetails.user.avatar);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.navbar} position="static">
        <Toolbar>
          <FontAwesomeIcon
            icon={faLeaf}
            className={classes.icon}
          ></FontAwesomeIcon>
          <Button>Anigram</Button>
          {/* <img alt="user avatar" src={avatar}></img> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
