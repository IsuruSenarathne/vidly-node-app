const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
// Joi.objectId  =require("joi-objectid")(Joi); // set objectId method in Joi class;
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movies");

const cusomerSchemaForRental = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: Number,
    required: true
  }
});

const movieSchemaForRental = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  dailyRentalRate: {
    type: Number,
    default: false
  }
});

const rentalSchema = mongoose.Schema({
  customer: {
    type: cusomerSchemaForRental,
    required: true
  },
  movie: {
    type: movieSchemaForRental,
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now()
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
});

function validateRental(rentalObj) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(), // we can now use new objectId here
    movieId: Joi.objectId().required()
  });
  return schema.validate(rentalObj);
}

const Rental = mongoose.model("Rental", rentalSchema);

exports.Rental = Rental;
exports.validate = validateRental;

//  _id: 5de2b87bdf316333384893a3
// mongoose id container followings
// 4 bytes: timestamp
// 3 bytes: machine indentifier
// 3 bytes: process identifier 
// 3 bytes: counter - identify differnt documents

//  const id  = new mongoose.Types.ObjectId();
//  console.log(id.getTimestamp()) // get time from ID
//  mongoose. Type.Object.isValid("255569998") // check ID is valid


