import React from "react";
import { useSelector } from "react-redux";
const Homepage = () => {
  const user = useSelector((state) => state.authentication.username);
  return (
    <>
      <h1>{`Welcome to Anigram, ${user}!`}</h1>
    </>
  );
};

export default Homepage;
