const router = require('express').Router();

const users_api = require("./users.js");

router.use("/users", users_api);

module.exports = router;