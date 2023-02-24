const router = require("express").Router();
const { authenticationMiddleware } = require("../middleware/auth");
const { getAllPosts, createPost, getPost, updatePost, deletePost } = require("../controllers/posts");

router.route("/").get(getAllPosts).post(authenticationMiddleware, createPost);

router.route("/:id").get(getPost).patch(authenticationMiddleware, updatePost).delete(authenticationMiddleware, deletePost);

module.exports = router;
