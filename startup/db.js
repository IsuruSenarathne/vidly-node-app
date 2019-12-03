const winston = require("winston");
const mongoose = require("mongoose");
const DB_URI = "mongodb://localhost/vidly";

module.exports = function() {
  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => winston.info("Connected to MongoDB..."));
};

// we don't use catch error as we need to terminate in case DB fails.
