const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Serve l'ID del servizio prenotato"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Serve l'ID dell'utente che prenota il servizio"],
    },
    date: {
      type: Date,
      required: [true, "Serve la data di prenotazione"],
    },
  },
  { timestamps: true }
);

BookingSchema.index({ service: 1, date: 1 }, { unique: [true, "Prenotazione non più disponibile"] });

module.exports = mongoose.model("Booking", BookingSchema);
