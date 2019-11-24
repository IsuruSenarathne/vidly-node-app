function auth(req, res, next) {
  console.log("Auth middleware initiated");
  next();
}

module.exports = auth;
