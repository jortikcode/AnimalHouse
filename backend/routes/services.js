const router = require("express").Router();
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

const { getAllServices, createService, getService, updateService, deleteService } = require("../controllers/services");

router.route("/").get(getAllServices).post(upload.single("imgName"), createService);
router.route("/:id").get(getService).patch(upload.single("imgName"), updateService).delete(deleteService);

module.exports = router;
