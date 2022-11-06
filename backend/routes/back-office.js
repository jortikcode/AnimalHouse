const router = require("express").Router();
const path = require("path");

router.get(["/", "/index.html"], (req, res) => {
  res.sendFile(path.join(global.baseDir, "..", "./back-office", "index.html"));
});
router.get("/login", (req, res) => {
  res.sendFile(path.join(global.baseDir, "..","./back-office", "login.html"));
});

module.exports = router;
