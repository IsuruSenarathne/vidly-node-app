const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const customerSchema = mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true,
    minlenght: 3,
    maxlength: 20
  },
  phone: {
    type: Number,
    minlenght: 3,
    required: true
  }
});

function validateCustomer(customerObject) {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string()
      .min(3)
      .max(20)
      .required(),
    phone: Joi.number()
  });
  return schema.validate(customerObject);
}

Customer = mongoose.model("Customer", customerSchema);

exports.Customer = Customer;
exports.validate = validateCustomer;
