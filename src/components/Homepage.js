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
  const [newPostLoading, setNewPostLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h1>{!user ? `Welcome to Anigram!` : `Welcome to Anigram, ${user}!`}</h1>
      <Posts
        newPostLoading={newPostLoading}
        setNewPostLoading={setNewPostLoading}
      />
      <div className="fab-container">
        <Fab
          onClick={handleClickOpen}
          style={{ backgroundColor: "#fffcd6" }}
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </div>
      <PostForm
        setNewPostLoading={setNewPostLoading}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

export default Homepage;
