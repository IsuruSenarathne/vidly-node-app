const express = require("express");
const winston = require("winston");
app = express();

require("./startup/logging")();
require("./startup/routes")(app); // require return a function and we can call that func with param "app"
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`listening to port ${port}...`));
