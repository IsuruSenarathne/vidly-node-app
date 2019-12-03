const genres = require("../api/genres");
const home = require("../api/home");
const customers = require("../api/customers");
const movies = require("../api/movies");
const rentals = require("../api/rentals");
const users = require("../api/users");
const auth = require("../api/auth");
const error = require("../middleware/error");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

module.exports = function(app) {
  app.use("/", home);
  app.use("/api/auth", auth);
  app.use("/api/genres", genres);
  app.use("/api/home", home);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use(error);
  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("static")); // give folder name
  app.use(helmet());
  app.disable("x-powered-by"); // for security reasons

  if (app.get("env") === "development") {
    // dev env only
    // to log requsets
    app.use(morgan("tiny"));
  }
};
