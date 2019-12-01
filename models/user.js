const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const PasswordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");
const config = require("config");

const complexityOptions = {
  min: 10,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: Boolean
});

// NOTE: on advance apps, isAdmin will be roles =[]

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

// here we dont use ()=> {} fucntinos as those donsent have "this" for object. it always refers calling fucntion as "this"

const User = mongoose.model("User", userSchema);

function validateUser(userObject) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(20)
      .required(),
    email: Joi.string().email(),
    password: Joi.string()
  });
  return schema.validate(userObject);
}

exports.User = User;
exports.validate = validateUser;
exports.userSchema = userSchema;
