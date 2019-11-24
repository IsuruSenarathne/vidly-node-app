const express = require("express");
const router = express.Router();
const _ = require("lodash");
const {Customer, validate} = require("../models/customer")

// GET api/customers
router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
  res.end();
});

// POST api/customers
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  const { isGold, name, phone } = req.body;
  try {
    const customer = new Customer({
      isGold,
      name,
      phone
    });
    const result = await customer.save();
    res.send(result);
    res.end();
  } catch (ex) {
    console.log("ERROR: POST api/customers", ex);
  }
});

module.exports = router