const Bill = require("../models/bill");
const { createCustomError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

/* Crea una nuova fattura */
const createBill = async (req, res) => {
  const bill = await Bill.create(req.body);
  res.status(StatusCodes.CREATED).json({ bill });
};

/* Ottiene tutte le fatture */
const getAllBills = async (req, res) => {
  const { userID, sort, fields } = req.query;
  const queryObject = {};

  if (userID) {
    queryObject.user = { $regex: userID, $options: "i" };
  }

  let result = Bill.find(queryObject).populate("user", "products");
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("paidAt");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  // calcolo i risultati da saltare in base alla pagina che mi trovo
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const bills = await result;
  res.status(StatusCodes.OK).json(bills);
};

/* Ottiene una singola fattura in base all'ID */
const getBill = async (req, res) => {
  const { id: billID } = req.params;
  const bill = await Bill.findOne({ _id: billID }).populate("user", "products");
  if (!bill) {
    throw createCustomError(
      `Non esiste nessuna fattura con id : ${billID}`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json({ bill });
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
    throw createCustomError(
      `Non esiste nessuna fattura con id : ${billID}`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json({ id: billID, data: req.body });
};

/* Elimina una fattura in base all'ID */
const deleteBill = async (req, res) => {
  const { id: billID } = req.params;
  const bill = await Bill.findOneAndDelete({ _id: billID });
  if (!bill) {
    throw createCustomError(
      `Non esiste nessuna fattura con id : ${billID}`,
      StatusCodes.NOT_FOUND
    );
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: `La fattura con id ${billID} è stato rimosso con successo` });
};

module.exports = {
  getAllBills,
  createBill,
  getBill,
  updateBill,
  deleteBill,
};
