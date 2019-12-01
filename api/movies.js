const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Movie, validate } = require("../models/movies");
const {Genre} = require("../models/genre");

// GET api/movies
router.get("/", async (req, res) => {
  const movies = await Movie
  .find()
  .populate("genre")
  res.send(movies);
  res.end();
});

// POST api/movies
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send("No valid genre found")
  try {
    const movie = new Movie({
      title: req.body.title,
      genre: genre._id,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    });

    await movie.save();
    res.send(movie);
    res.end();
  } catch (ex) {
    console.log("ERROR: POST api/movies", ex);
  }
});

module.exports = router;
