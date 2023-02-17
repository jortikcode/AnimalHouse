const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
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
  startDate: {
    type: Date,
    required: [true, "Serve la data di prenotazione"],
  },
  endDate: {
    type: Date,
    required: [true, "Serve la data di prenotazione"],
  },
});


module.exports = mongoose.model("Booking", BookingSchema);
