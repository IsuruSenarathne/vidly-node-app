const genres = require("./api/genres");
const home = require("./api/home");
const customers = require("./api/customers")
const express = require("express");
const logger = require("./middleware/logger");
const auth = require("./middleware/auth");
const helmet = require("helmet");
const morgan = require("morgan");
const _ = require("lodash");
const config = require("config");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connected mongo db"))
  .catch(error => console.log("ERROR", error));

app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static")); // give folder name
app.use(helmet());
app.disable("x-powered-by"); // for security reasons
app.use(logger);
app.use(auth);

console.log(config.get("name"));
console.log(config.get("mail").host);
console.log(process.env.NODE_ENV);

if (app.get("env") === "development") {
  // dev env only
  // to log requsets
  app.use(morgan("tiny"));
}

app.use("/api/genres", genres);
app.use("/api/home", home);
app.use("/api/customers", customers);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}`));
