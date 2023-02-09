const Post = require("../models/posts");
const { createCustomError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const getAllPosts = async (req, res) => {
  const { title, text, sort, fields } = req.query;
  const queryObject = {};

  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }
  if (text) {
    queryObject.text = { $regex: text, $options: "i" };
  }

  let result = Post.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("date");
  }

  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  // calcolo i risultati da saltare in base alla pagina che mi trovo
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const posts = await result;
  res.status(StatusCodes.OK).json(posts);
};

const createPost = async (req, res) => {
  const post = await Post.create(req.body);
  res.status(StatusCodes.CREATED).json({ post });
};

const getPost = async (req, res) => {
  const { id: postID } = req.params;
  const post = await Post.findOne({ _id: postID });
  if (!post) {
    throw createCustomError(
      `Non esiste nessun post con id : ${postID}`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json({ post });
};

const updatePost = async (req, res) => {
  const { id: postID } = req.params;
  const post = await Post.findOneAndUpdate(
    { _id: postID },
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!post) {
    throw createCustomError(
      `Non esiste nessun post con id : ${postID}`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json({ id: postID, data: req.body });
};

const deletePost = async (req, res) => {
  const { id: postID } = req.params;
  const post = await Post.findOneAndDelete({ _id: postID });
  if (!post) {
    throw createCustomError(
      `Non esiste nessun post con id : ${postID}`,
      StatusCodes.NOT_FOUND
    );
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: `Il post con id ${postID} è stato rimosso con successo` });
};

module.exports = {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
};
