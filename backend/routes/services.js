const router = require("express").Router();

const {
  getAllServices,
  createService,
  getService,
  updateService,
  deleteService,
} = require("../controllers/services");

router.route("/").get(getAllServices).post(createService);
router.route("/:id").get(getService).patch(updateService).delete(deleteService);

module.exports = router;
