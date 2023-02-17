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
    imgName: {
      type: String,
      default: "default_service_image.jpg",
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
  },
  { timestamps: true }
);
/* Si suppene che ogni servizio sia disponibile da lunedì a venerdì dalle 9 alle 17 */

module.exports = mongoose.model("Service", ServiceSchema);
