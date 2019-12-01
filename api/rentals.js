const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movies");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const Fawn = require("fawn");

Fawn.init(mongoose);

// GET api/rentals
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
  res.end();
});

// POST api/rental
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send("No valid movie found");

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send("No valid customer found");

  if (movie.numberInStock === 0) return res.status(400).send("Out of stock");

  try {
    const rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone
      },
      movie: {
        // only need to add required ones
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
      }
    });
    // here saving "rental" and saving "movie" shold be atomic
    // means both should success or in case one fails, both should roll back
    // for this we need to use TRANSACTIONS.
    // mongo dosent have transactions but it can something called "PERFORM TWO PHASE COMMIT"
    // which is same as transactions.
    // we can use lib "fawn" to perform 2 phase commits(>>> npm i fawn)

    // following is the old code without 2phase commit
    // const result = await rental.save();
    // movie.numberInStock--;
    // movie.save();

    //using Fawn to 2phase commit
    new Fawn.Task()
      .save("rentals", rental) // params: collection name(rentals) , rantal(new rantal object)
      .update(
        "movies", // collection name
        { _id: movie._id }, // query object
        {
          $inc: { numberInStock: -1 } // perform action
        }
      )
      .run();
    res.send(rental);
  } catch (ex) {
    console.log("ERROR: POST api/rentals", ex);
  }
});

module.exports = router;
