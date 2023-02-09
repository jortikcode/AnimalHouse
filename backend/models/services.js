const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: [true, "La tipologia del servizio deve essere fornita"],
    },
    description: {
      type: String,
      required: [true, "La descrizione del servizio deve essere fornita"],
    },
    price: {
      type: Number,
      required: [true, "Il prezzo del servizio deve essere fornito"],
    },
    location: {
      type: mongoose.Types.ObjectId,
      ref: "Location",
      required: [
        true,
        "Dove viene offerto questo servizio deve essere fornito",
      ],
    },
    availability: [
      {
        date: {
          type: Date,
          required: [true, "La data deve essere fornita"],
        },
        time: {
          type: Object,
          default: {
            9: true,
            10: true,
            11: true,
            12: true,
            13: true,
            14: true,
            15: true,
            16: true,
            17: true,
          },
        },
      },
    ],
  },
  { timestamps: true }
);
/* Si suppene che ogni servizio sia disponibile da lunedì a venerdì dalle 9 alle 17 */

module.exports = mongoose.model("Service", ServiceSchema);
