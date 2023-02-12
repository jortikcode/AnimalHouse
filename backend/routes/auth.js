const router = require("express").Router();

const {
  login,
  register,
  loginAdmin,
  forgotPassword,
  resetPassword,
  registerAdmin,
} = require("../controllers/auth");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/loginAdmin").post(loginAdmin);
router.route("/registerAdmin").post(registerAdmin);
router.route("/resetPassword").post(forgotPassword);
router.route("/resetPassword/:token").patch(resetPassword);

module.exports = router;
