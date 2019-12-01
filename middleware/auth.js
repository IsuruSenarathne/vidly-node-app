const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  console.log(token)
  if (!token) return res.status(401).send("Access Denide. No token provided");
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded; // decode will decoded jwt body content(ex: _id)
    next(); // pass to next middleware
  } catch (ex) {
    return res.status(404).send("Invalid token.");
  }
}

module.exports = auth;
