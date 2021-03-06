const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  }
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genreObject) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(20)
      .required()
  });
  return schema.validate(genreObject);
}

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;