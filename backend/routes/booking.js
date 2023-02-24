const router = require("express").Router();
const { authenticationMiddleware } = require("../middleware/auth");
const { getAllBookings, createBooking, getBooking, updateBooking, deleteBooking } = require("../controllers/booking");

router.route("/").get(getAllBookings).post(authenticationMiddleware, createBooking);
router.route("/:id").get(getBooking).patch(authenticationMiddleware, updateBooking).delete(authenticationMiddleware, deleteBooking);

module.exports = router;
