const router = require("express").Router();
const { authenticationMiddleware } = require("../middleware/auth");
const { getAllBills, createBill, getBill, updateBill, deleteBill } = require("../controllers/bill");

router.route("/").get(getAllBills).post(authenticationMiddleware, createBill);
router.route("/:id").get(getBill).patch(authenticationMiddleware, updateBill).delete(authenticationMiddleware, deleteBill);

module.exports = router;
