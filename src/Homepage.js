import React from "react";
import { useSelector } from "react-redux";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Posts from "./Posts";
import "./Homepage.css";
import PostForm from "./PostForm";

const Homepage = () => {
  const user = useSelector((state) => state.authentication.username);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h1>{!user ? `Welcome to Anigram!` : `Welcome to Anigram, ${user}!`}</h1>
      <Posts />
      <div className="fab-container">
        <Fab onClick={handleClickOpen} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
      <PostForm open={open} onClose={handleClose} />
    </>
  );
};

export default Homepage;
