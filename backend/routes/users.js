const router = require("express").Router();
const { authenticationMiddleware } = require("../middleware/auth");
const path = require("path");
/// File upload
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${global.baseDir}/public/media/`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const { getAllUsers, getUser, updateUser, deleteUser } = require("../controllers/users");

router.route("/").get(getAllUsers);

router.route("/:id").get(getUser).patch(upload.single("imgName"), authenticationMiddleware, updateUser).delete(authenticationMiddleware, deleteUser);

module.exports = router;
