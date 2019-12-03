const winston = require("winston");

module.exports = function(err, req, res, next) {
    winston.error("ERROR MIDDLEWARE: ", err)
    res.status(500).send("Internal Server Error")
}

// error
// warn
// info
// verbose
// debug
// silly