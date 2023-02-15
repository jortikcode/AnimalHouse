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

const { getAllProducts, createProduct, getProduct, updateProduct, deleteProduct } = require("../controllers/products");

router.route("/").get(getAllProducts).post(upload.single("imgPath"), createProduct);
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
