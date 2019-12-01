const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

// POST api/users
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(404).send("User already registered");

  try {
    // const user = new User({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password
    // });

    // you can get same above result using below code
    const user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10); // we use salt to create hash
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (ex) {
    console.log("ERROR: POST api/users", ex);
  }
});

// NOTE: for password complexity
module.exports = router;
