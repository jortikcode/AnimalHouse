const Bill = require("../models/bill");
const Product = require("../models/product");
const Cart = require("../models/cart");
const { createCustomError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const product = require("../models/product");

const createBillProducts = async (body) => {
  const { user, type, products, total, paymentMethod } = body;
  let quantities = [];
  for (const product of products) {
    const { qta: quantity } = await Product.findById(product.product);
    quantities.push(quantity);
    if (quantity < parseInt(product.quantity)) throw createCustomError(`Impossibile ordinare, svuotare il carrello e riprovare`, StatusCodes.CONFLICT);
  }

  const session = await mongoose.startSession();
  // Inizio della transazione
  session.startTransaction();
  let index = 0;
  const updatedProducts = [];
  for (const product of products) {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: product.product },
      {
        $set: {
          qta: quantities[index] - parseInt(product.quantity),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    updatedProducts.push(updatedProduct);
    index++;
  }
  const bill = await Bill.create({
    user,
    type,
    products,
    total,
    paymentMethod,
  });
  // Il carrello puo' essere
  const cart = await Cart.deleteOne({ user: user });
  // Fine della transazione
  await session.commitTransaction();

  return { bill: bill, products: updatedProducts, cart: cart };
};

const createBillService = async (body) => {
  const { user, type, service, total, paymentMethod } = body;
  const bill = await Bill.create({
    user,
    type,
    service,
    total,
    paymentMethod,
  });
  return { bill: bill };
};

/* Crea una nuova fattura */
const createBill = async (req, res) => {
  let response = {};
  if (req.body.type == "products") {
    response = await createBillProducts(req.body);
  }
  if (req.body.type == "service") {
    response = await createBillService(req.body);
  }
  res.status(StatusCodes.CREATED).json(response);
};

/* Ottiene tutte le fatture */
const getAllBills = async (req, res) => {
  const { userID, sort } = req.query;
  const queryObject = {};
  if (userID) {
    queryObject.user = userID;
  }
  let result = Bill.find(queryObject).populate("user").populate("products.product").populate("service");
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("paidAt");
  }
  const bills = await result;
  res.status(StatusCodes.OK).json(bills);
};

/* Ottiene una singola fattura in base all'ID */
const getBill = async (req, res) => {
  const { id: billID } = req.params;
  const bill = await Bill.findOne({ _id: billID }).populate("user").populate("products.product").populate("service");
  if (!bill) {
    throw createCustomError(`Non esiste nessuna fattura con id : ${billID}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json(bill);
};

/* Per modificare una fattura in base all'ID */
const updateBill = async (req, res) => {
  const { id: billID } = req.params;
  const bill = await Bill.findOneAndUpdate(
    { _id: billID },
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!bill) {
    throw createCustomError(`Non esiste nessuna fattura con id : ${billID}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ id: billID, data: req.body });
};

/* Elimina una fattura in base all'ID */
const deleteBill = async (req, res) => {
  const { id: billID } = req.params;
  const bill = await Bill.findOneAndDelete({ _id: billID });
  if (!bill) {
    throw createCustomError(`Non esiste nessuna fattura con id : ${billID}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ msg: `La fattura con id ${billID} è stato rimosso con successo` });
};

module.exports = {
  getAllBills,
  createBill,
  getBill,
  updateBill,
  deleteBill,
};
