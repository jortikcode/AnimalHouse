const router = require("express").Router();

const {
  getCartItems,
  addToCart,
  updateCartItem,
} = require("../controllers/cart");

router.route("/").get(getCartItems).post(addToCart).patch(updateCartItem);

module.exports = router;
