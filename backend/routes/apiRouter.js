const router = require("express").Router();

const users_api = require("./users");
const posts_api = require("./posts");
const products_api = require("./products");
const auth_api = require("./auth");
const locations_api = require("./locations");
const services_api = require("./services");
const booking_api = require("./booking");
const cart_api = require("./cart");
const bill_api = require("./bill");

router.use("/users", users_api);
router.use("/posts", posts_api);
router.use("/products", products_api);
router.use("/auth", auth_api);
router.use("/locations", locations_api);
router.use("/services", services_api);
router.use("/booking", booking_api);
router.use("/cart", cart_api);
router.use("/bill", bill_api);

module.exports = router;
