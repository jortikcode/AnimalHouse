const Booking = require("../models/booking");
const Service = require("../models/services");
const User = require("../models/users");
const { createCustomError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const prepareQuery = async (query) => {
  const { service, startDate, endDate } = query;
  const queryObject = {};
  if (service) {
    const serviceID = await Service.findOne({ serviceName: service });
    queryObject.service = serviceID._id;
  }
  if (startDate && !endDate) {
    queryObject.date = { $gte: startDate };
  }
  if (endDate && !startDate) {
    queryObject.date = { $lt: endDate };
  }
  if (startDate && endDate) {
    queryObject.date = { $gte: startDate, $lt: endDate };
  }
  return queryObject;
};

const getAllBookings = async (req, res) => {
  const { sort, location } = req.query;
  const queryObject = await prepareQuery(req.query);
  let result = Booking.find(queryObject).populate("user").populate("service");
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("date");
  }
  let bookings = await result;
  /* Vado a prendere le prenotazioni di un servizio di una determinata sede */
  if (location) {
    bookings = bookings.filter((booking) => booking.service.location.toString() === location.toString());
  }
  res.status(StatusCodes.OK).json(bookings);
};

const createBooking = async (req, res) => {
  const booking = await Booking.create(req.body);
  res.status(StatusCodes.CREATED).json({ booking });
};

const getBooking = async (req, res) => {
  const { id: bookingID } = req.params;
  const booking = await Booking.findOne({ _id: bookingID });
  if (!booking) {
    throw createCustomError(`Non esiste nessuna prenotazione con id : ${bookingID}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ booking });
};

const updateBooking = async (req, res) => {
  const { id: bookingID } = req.params;
  const booking = await Booking.findOneAndUpdate(
    { _id: bookingID },
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!booking) {
    throw createCustomError(`Non esiste nessuna prenotazione con id : ${bookingID}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ id: bookingID, data: req.body });
};

const deleteBooking = async (req, res) => {
  const { id: bookingID } = req.params;
  const booking = await Booking.findOneAndDelete({ _id: bookingID });
  if (!booking) {
    throw createCustomError(`Non esiste nessuna prenotazione con id : ${bookingID}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ msg: `La prenotazione con id ${bookingID} è stato rimossa con successo` });
};

module.exports = {
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
};
