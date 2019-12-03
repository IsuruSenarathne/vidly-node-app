const Joi = require("@hapi/joi");

module.exports = function() {
  Joi.objectId = require("joi-objectid")(Joi); // set objectId method in Joi class;
};
