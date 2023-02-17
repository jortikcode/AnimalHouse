const Booking = require("../models/booking");
const { createCustomError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const prepareQuery = (query) => {
  const { service, startDate, endDate } = query;
  const queryObject = {};
  if (service) {
    queryObject.service = service;
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
  const { sort } = req.query;
  const queryObject = prepareQuery(req.query);
  let result = Booking.find(queryObject).populate("service", "user");
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("date");
  }
  const posts = await result;
  res.status(StatusCodes.OK).json(posts);
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
