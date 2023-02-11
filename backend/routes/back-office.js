const router = require("express").Router();
const path = require("path");

router.get(["/", "/index.html"], (req, res) => {
  res.sendFile(path.join(global.baseDir, "..", "./back-office", "index.html"));
});
router.get("/login", (req, res) => {
  res.sendFile(path.join(global.baseDir, "..", "./back-office", "login.html"));
});
router.get("/utenti", (req, res) => {
  res.sendFile(path.join(global.baseDir, "..", "./back-office", "users.html"));
});
router.get("/sedi", (req, res) => {
  res.sendFile(path.join(global.baseDir, "..", "./back-office", "location.html"));
});
router.get("/prodotti", (req, res) => {
  res.sendFile(path.join(global.baseDir, "..", "./back-office", "product.html"));
});
router.get("/servizi", (req, res) => {
  res.sendFile(path.join(global.baseDir, "..", "./back-office", "service.html"));
});
router.get("/bacheca", (req, res) => {
  res.sendFile(path.join(global.baseDir, "..", "./back-office", "post.html"));
});
router.get("/prenotazioni", (req, res) => {
  res.sendFile(path.join(global.baseDir, "..", "./back-office", "booking.html"));
});
router.get("/fatture", (req, res) => {
  res.sendFile(path.join(global.baseDir, "..", "./back-office", "bill.html"));
});

module.exports = router;
