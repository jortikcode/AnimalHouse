const router = require("express").Router();
const { authenticationMiddleware } = require("../middleware/auth");
const { getCartItems, addToCart, updateCartItem } = require("../controllers/cart");

router.route("/").get(getCartItems).post(authenticationMiddleware, addToCart).patch(authenticationMiddleware, updateCartItem);

module.exports = router;
