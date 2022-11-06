const router = require("express").Router();
const { logout, mainPage, loginPage, loginFetch, usersPage } = require("../controllers/admin");

router.route("/").get(mainPage);

router.route("/login").get(loginPage).post(loginFetch);

router.route("/users").get(usersPage);

router.route("/logout").get(logout);

module.exports = router;
