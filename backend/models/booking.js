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
    required: [true, "Serve l'ID del servizio prenotato"],
  },
  date: {
    type: Date,
    required: [true, "Serve l'ID del servizio prenotato"],
  },
  startHour: {
    type: Number,
    min: 9,
    max: 17,
    required: [true, "Serve l'ID del servizio prenotato"],
  },
  endHour: {
    type: Number,
    min: 10,
    max: 18,
  },
});

/* Imposta in modo automatico l'ora di fine prenotazione in quanto si suppone che 1 ora */
BookingSchema.pre("save", function (next) {
  this.endHour = this.startHour + 1;
  next();
});

module.exports = mongoose.model("Booking", BookingSchema);
