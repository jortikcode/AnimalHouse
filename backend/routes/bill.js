const router = require("express").Router();

const {
  getAllBills,
  createBill,
  getBill,
  updateBill,
  deleteBill,
} = require("../controllers/bill");

router.route("/").get(getAllBills).post(createBill);
router.route("/:id").get(getBill).patch(updateBill).delete(deleteBill);

module.exports = router;
