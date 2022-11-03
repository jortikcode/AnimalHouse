const router = require("express").Router();
const fetch = require("node-fetch");
const { mainPage, loginPage, loginFetch } = require("../controllers/admin");

router.route("/").get(mainPage);

router.route("/login").get(loginPage);

router.route("/login").post(loginFetch);

module.exports = router;
