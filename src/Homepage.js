import React from "react";
import { useSelector } from "react-redux";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Posts from "./Posts";
import "./Homepage.css";

const Homepage = () => {
  const user = useSelector((state) => state.authentication.username);

  return (
    <>
      <h1>{!user ? `Welcome to Anigram!` : `Welcome to Anigram, ${user}!`}</h1>
      <Posts />
      <div className="fab-container">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </>
  );
};

export default Homepage;
