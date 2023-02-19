const Booking = require("../models/booking");
const Service = require("../models/services");
const User = require("../models/users");
const { createCustomError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const prepareQuery = async (query) => {
  const { startDate, endDate, serviceID } = query;
  const queryObject = {};
  if (serviceID) {
    queryObject.service = serviceID;
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
  const { sort, location, user, service } = req.query;
  const queryObject = await prepareQuery(req.query);
  let populateUser = "user";
  if (user) {
    const regex = new RegExp(user, "i");
    const filter = { email: { $regex: regex } };
    populateUser = { path: "user", match: filter };
  }
  let populateService = "service";
  if (service) {
    const regex = new RegExp(service, "i");
    const filter = { serviceName: { $regex: regex } };
    populateService = { path: "service", match: filter };
  }
  let result = Booking.find(queryObject).populate(populateUser).populate(populateService);
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
    bookings = bookings.filter((booking) => booking.service?.location.toString() === location.toString());
  }
  if (user) {
    bookings = bookings.filter((booking) => booking.user !== null);
  }
  if (service) {
    bookings = bookings.filter((booking) => booking.service !== null);
  }
  res.status(StatusCodes.OK).json(bookings);
};

const createBooking = async (req, res) => {
  const booking = await Booking.create(req.body);
  res.status(StatusCodes.CREATED).json({ booking });
};

const getBooking = async (req, res) => {
  const { id: bookingID } = req.params;
  const booking = await Booking.findOne({ _id: bookingID }).populate("user").populate("service");
  if (!booking) {
    throw createCustomError(`Non esiste nessuna prenotazione con id : ${bookingID}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json(booking);
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
