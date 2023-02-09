const Cart = require("../models/cart");
const Product = require("../models/product");
const { createCustomError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

/* Recupera tutti gli elementi nel carrello di un utente */
const getCartItems = async (req, res) => {
  const cart = await Cart.findOne({ user: req.userInfo.id }).populate(
    "products"
  );
  if (!cart) {
    const newCart = new Cart({
      user: req.userInfo.id,
      products: [],
    });
    await newCart.save();
    res.status(StatusCodes.CREATED).json(newCart);
  } else {
    res.status(StatusCodes.OK).json(cart.products);
  }
};

/* Aggiunge un prodotto al carrello di un utente */
const addToCart = async (req, res) => {
  const product = await Product.findById(req.body.productId);
  if (!product) {
    throw createCustomError(
      `Non esiste nessun prodotto con id : ${req.body.productId}`,
      StatusCodes.NOT_FOUND
    );
  }
  /* In caso l'utente non avesso un carrello associato lo si crea */
  const cart = await Cart.findOne({ user: req.userInfo.id });
  if (!cart) {
    const newCart = new Cart({
      user: req.userInfo.id,
      products: [{ product: product._id, quantity: req.body.quantity }],
    });
    await newCart.save();
    res.status(StatusCodes.CREATED).json(newCart);
  }

  const productIndex = cart.products.findIndex(
    (item) => item.product.toString() === product._id.toString()
  );
  if (productIndex === -1) {
    cart.products.push({ product: product._id, quantity: req.body.quantity });
  } else {
    cart.products[productIndex].quantity += req.body.quantity;
  }

  await cart.save();
  res.status(StatusCodes.OK).json(cart);
};

function isPositive(element) {
  return element.quantity > 0;
}

/* Modifica la quantità di un prodotto nel carrello di un utente */
const updateCartItem = async (req, res) => {
  const product = await Product.findById(req.body.productId);
  if (!product) {
    throw createCustomError(
      `Non esiste nessun prodotto con id : ${req.body.productId}`,
      StatusCodes.NOT_FOUND
    );
  }

  const cart = await Cart.findOne({ user: req.userInfo.id });
  if (!cart) {
    throw createCustomError(
      `Non esiste nessun carrello associato all'utente : ${req.userInfo.id}`,
      StatusCodes.NOT_FOUND
    );
  }

  const productIndex = cart.products.findIndex(
    (item) => item.product.toString() === product._id.toString()
  );
  if (productIndex === -1) {
    throw createCustomError(
      `Prodotto non trovato nel carrello`,
      StatusCodes.NOT_FOUND
    );
  }

  cart.products[productIndex].quantity = req.body.quantity;
  /* In caso si imposta come quantità 0 equivale a eliminare dal carrello */
  cart.products = cart.products.filter(isPositive);
  await cart.save();
  res.status(StatusCodes.OK).json(cart);
};

module.exports = {
  getCartItems,
  addToCart,
  updateCartItem,
};
