module.exports = {
  api:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api"
      : "https://anigram-app.herokuapp.com/api",
};
