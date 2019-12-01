// Role based authorization

// 401 - Unauthorized
// 403 - forbidden

module.exports = function(req, res, next) {
  console.log(req.user);
  if (!req.user.isAdmin) return res.status(403).send("Access denide.");
  next();
};
