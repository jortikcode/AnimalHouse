const Product = require("../models/product");
const { createCustomError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const path = require("path");

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
  const { sort, fields, numericFilters, getCategories, limit } = req.query;
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
  let result = []
  if (limit)
    result = Product.find(queryObject).limit(limit);
  else
    result = Product.find(queryObject)
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
  const products = await result;
  res.status(StatusCodes.OK).json(products);
};

const createProduct = async (req, res) => {
  const { name, price, description, featured, qta, category, subcategory, location } = req.body;
  let imgName = "default_product_image.jpg";
  if (req.file?.filename) {
    imgName = req.file.filename;
  }
  const product = await Product.create({
    name,
    price,
    description,
    featured: Boolean(featured),
    qta: Number(qta),
    category,
    subcategory: subcategory.split(",").map((sub) => sub.trim()),
    imgName,
    location,
  });
  res.status(StatusCodes.CREATED).json(product);
};

const getProduct = async (req, res) => {
  const { id: productID } = req.params;
  const product = await Product.findOne({ _id: productID });
  if (!product) {
    throw createCustomError(`Non esiste nessun prodotto con id : ${productID}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ product });
};

const prepareUpdate = (body) => {
  const updateObj = {};
  const { name, price, description, featured, qta, category, subcategory } = body;
  if (name) {
    updateObj.name = name;
  }
  if (price) {
    updateObj.price = price;
  }
  if (description) {
    updateObj.description = description;
  }
  if (featured) {
    updateObj.featured = Boolean(featured);
  }
  if (qta) {
    updateObj.qta = qta;
  }
  if (category) {
    updateObj.category = category;
  }
  if (subcategory) {
    updateObj.subcategory = subcategory.split(",").map((sub) => sub.trim());
  }
  return updateObj;
};

const updateProduct = async (req, res) => {
  const { id: productID } = req.params;
  const updateObj = prepareUpdate(req.body);
  if (req.file?.filename) {
    updateObj.imgName = req.file.filename;
    /* Cancello l'immagine precente */
    const product = await Product.findOne({ _id: productID });
    if (!product) {
      throw createCustomError(`Non esiste nessun prodotto con id : ${productID}`, StatusCodes.NOT_FOUND);
    }
    if (product.imgName != "default_product_image.jpg") {
      fs.unlink(path.join(global.baseDir, "public", "media", product.imgName), (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }

  const product = await Product.findOneAndUpdate(
    { _id: productID },
    {
      $set: updateObj,
    },
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
  const product = await Product.findOne({ _id: productID });
  if (!product) {
    console.log(productID);
    throw createCustomError(`Non esiste nessun prodotto con id : ${productID}`, StatusCodes.NOT_FOUND);
  }
  if (product.imgName != "default_product_image.jpg") {
    fs.unlink(path.join(global.baseDir, "public", "media", product.imgName), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  await Product.deleteOne({ _id: productID });
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
