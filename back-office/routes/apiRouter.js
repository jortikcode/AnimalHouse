const router = require("express").Router();

const users_api = require("./users");
const posts_api = require("./posts");
const products_api = require("./products");
const auth_api = require("./auth");

router.use("/users", users_api);
router.use("/posts", posts_api);
router.use("/products", products_api);
router.use("/auth", auth_api);

module.exports = router;
