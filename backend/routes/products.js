const router = require("express").Router();

const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
} = require("../controllers/products");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);
router.route("/categories").get(getAllCategories);

module.exports = router;
