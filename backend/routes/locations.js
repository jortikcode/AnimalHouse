const router = require("express").Router();
const { authenticationMiddleware } = require("../middleware/auth");
const { getAllLocations, createLocation, getLocationByID, updateLocation, deleteLocation, getAllCities } = require("../controllers/locations");

router.route("/").get(getAllLocations).post(createLocation);

// Prima di /:id per evitare conflitti
router.route("/city").get(getAllCities);

router.route("/:id").get(getLocationByID).patch(authenticationMiddleware, updateLocation).delete(authenticationMiddleware, deleteLocation);

module.exports = router;
