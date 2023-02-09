const Booking = require("../models/booking");
const { createCustomError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const getAllBookings = async (req, res) => {
  const {sort} = req.query;

  let result = Booking.find({});
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("date");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  // calcolo i risultati da saltare in base alla pagina che mi trovo
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
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
    throw createCustomError(
      `Non esiste nessuna prenotazione con id : ${bookingID}`,
      StatusCodes.NOT_FOUND
    );
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
    throw createCustomError(
      `Non esiste nessuna prenotazione con id : ${bookingID}`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json({ id: bookingID, data: req.body });
};

const deleteBooking = async (req, res) => {
  const { id: bookingID } = req.params;
  const booking = await Booking.findOneAndDelete({ _id: bookingID });
  if (!booking) {
    throw createCustomError(
      `Non esiste nessuna prenotazione con id : ${bookingID}`,
      StatusCodes.NOT_FOUND
    );
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: `La prenotazione con id ${bookingID} è stato rimossa con successo` });
};

module.exports = {
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
};
