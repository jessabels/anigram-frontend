import React from "react";
import { useSelector } from "react-redux";
import Posts from "./Posts";
const Homepage = () => {
  const user = useSelector((state) => state.authentication.username);
  return (
    <>
      <h1>{`Welcome to Anigram, ${user}!`}</h1>
      <Posts />
    </>
  );
};

export default Homepage;
