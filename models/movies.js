const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { Genre } = require("../models/genre");

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre"
  },
  numberInStock: {
      type: Number,
      required: true
  },
  dailyRentalRate: {
      type: Number,
      required: true
  }
});

function validateMovie(movieObj) {
  const schema = Joi.object({
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number()
  });
  return schema.validate(movieObj);
}

const Movie = mongoose.model("Movie", movieSchema);

exports.Movie = Movie;
exports.validate = validateMovie;
