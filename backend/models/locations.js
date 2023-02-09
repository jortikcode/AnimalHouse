const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, "Ha bisogno di un indirizzo"],
    },
    city: {
      type: String,
      required: [true, "Ha bisogno di una città"],
    },
    province: {
      type: String,
      required: [true, "Ha bisogno di una provincia"],
    },
    region: {
      type: String,
      required: [true, "Ha bisogno di una regione"],
    },
    postalCode: {
      type: String,
      required: [true, "Ha bisogno di un codice postale"],
    },
  },
  { timestamps: true }
);

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
