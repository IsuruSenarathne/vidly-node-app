const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi")


function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string()
  });
  return schema.validate(req);
}   

// POST api/auth
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword  = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send("Invalid email or password");
  
  const token = user.generateAuthToken(); // INFORMARION EXPERT PRINCIPLE
  return res.send(token)
});
// NODT: INFORMARION EXPERT PRINCIPLE
// encapsulate all the informations ans methods in the module where it belongs
// here user authentication is responsibility of "user model" so we need to implement auth in "user model"

// NOTE: for password complexity user joi-password-complexity
module.exports = router;
