const router = require("express").Router();

const {
  getAllLocations,
  createLocation,
  getLocationByID,
  updateLocation,
  deleteLocation,
  getAllCities,
} = require("../controllers/locations");

router.route("/").get(getAllLocations).post(createLocation);

// Prima di /:id per evitare conflitti
router.route("/city").get(getAllCities);

router
  .route("/:id")
  .get(getLocationByID)
  .patch(updateLocation)
  .delete(deleteLocation);


module.exports = router;
