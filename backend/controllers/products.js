const Product = require("../models/product");
const { createCustomError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const prepareQuery = (query) => {
  const { featured, name, location, category } = query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (location) {
    queryObject.location = location.trim();
  }
  if (category) {
    queryObject.category = { $regex: category, $options: "i" };
  }
  return queryObject;
};

const getAllProducts = async (req, res) => {
  const { sort, fields, numericFilters, getCategories } = req.query;
  if (getCategories) {
    const categories = await Product.distinct("category");
    return res.status(StatusCodes.OK).json(categories);
  }
  const queryObject = prepareQuery(req.query);
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
    const options = ["price", "rating"];
    filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        if (queryObject[field]) queryObject[field][operator] = Number(value);
        else queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  let result = Product.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("featured");
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
  const products = await result;
  res.status(StatusCodes.OK).json(products);
};

const createProduct = async (req, res) => {
  const { name, price, description, featured, qta, category, subcategory, location } = req.body;
  await Product.create({
    name,
    price,
    description,
    featured: Boolean(featured),
    qta: Number(qta),
    category,
    subcategory: subcategory.split(",").map((sub) => sub.trim()),
    imgName: req.file.path,
    location,
  });
  res.redirect(`/back-office/prodotti`);
};

const getProduct = async (req, res) => {
  const { id: productID } = req.params;
  const product = await Product.findOne({ _id: productID });
  if (!product) {
    throw createCustomError(`Non esiste nessun prodotto con id : ${productID}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productID } = req.params;
  const product = await Product.findOneAndUpdate(
    { _id: productID },
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!product) {
    throw createCustomError(`Non esiste nessun prodotto con id : ${productID}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ id: productID, data: req.body });
};

const deleteProduct = async (req, res) => {
  const { id: productID } = req.params;
  const product = await Product.findOneAndDelete({ _id: productID });
  if (!product) {
    throw createCustomError(`Non esiste nessun prodotto con id : ${productID}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({
    msg: `Il prodotto con id ${productID} è stato rimosso con successo`,
  });
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
