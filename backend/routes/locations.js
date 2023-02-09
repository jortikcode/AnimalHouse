const router = require("express").Router();

const {
  getAllLocations,
  createLocation,
  getLocationByID,
  getLocationByCity,
  updateLocation,
  deleteLocation,
} = require("../controllers/locations");

router.route("/").get(getAllLocations).post(createLocation);

router
  .route("/:id")
  .get(getLocationByID)
  .patch(updateLocation)
  .delete(deleteLocation);

router.route("/city/:city").get(getLocationByCity);

module.exports = router;
