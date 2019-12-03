const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function() {
  // handling UNCAUGHT EXCEPTIONS
  // process.on("uncaughtException", ex => {
  //   console.log("uncaughtExceptionuncaughtException");
  //   winston.error(ex.message, ex);
  //   process.exit(1); // best practice: exit on uncaught exception and restart with clean state using PROCESS MANAGERS
  // });

  winston.handleExceptions(
    new winston.transports.Console({ colorized: true, prettyPrint: true}),
    new winston.transports.File({ filename: "uncaughtException.log" })
  )

  process.on("uncaughtException", (err, origin) => {
    console.log("uncaughtException", err);
    winston.error(err.message, err);
    throw err;
  });

  process.on("unhandledRejection", (reason, promise) => {
    winston.error(reason);
    throw reason;
  });

  // config logger
  winston.add(winston.transports.File, { filename: "logfile.log" });

  // connecting log to mongodb
  winston.add(winston.transports.MongoDB, {
    db: "mongodb://localhost/vidly",
    level: "error" // filter what will logged.
  });
};
