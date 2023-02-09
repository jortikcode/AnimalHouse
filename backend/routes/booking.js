const router = require("express").Router();

const {
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/booking");

router.route("/").get(getAllBookings).post(createBooking);
router.route("/:id").get(getBooking).patch(updateBooking).delete(deleteBooking);

module.exports = router;
