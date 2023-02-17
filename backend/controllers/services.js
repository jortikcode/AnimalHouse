const Service = require("../models/services");
const { createCustomError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const getAllServices = async (req, res) => {
  const queryObject = {};
  if (req.location) {
    queryObject["location"] = req.location;
  }
  const services = await Service.find(queryObject);
  res.status(StatusCodes.OK).json(services);
};

const createService = async (req, res) => {
  const service = await Service.create(req.body);
  res.status(StatusCodes.CREATED).json({ service });
};

const getService = async (req, res) => {
  const { id: serviceID } = req.params;
  const service = await Service.findOne({ _id: serviceID }).populate("location");
  if (!service) {
    throw createCustomError(`Non esiste nessun servizio con id : ${serviceID}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ service });
};

const updateService = async (req, res) => {
  const { id: serviceID } = req.params;
  const service = await Service.findOneAndUpdate(
    { _id: serviceID },
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!service) {
    throw createCustomError(`Non esiste nessun servizio con id : ${serviceID}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ id: serviceID, data: req.body });
};

const deleteService = async (req, res) => {
  const { id: serviceID } = req.params;
  const service = await Service.findOneAndDelete({ _id: serviceID });
  if (!service) {
    throw createCustomError(`Non esiste nessun servizio con id : ${serviceID}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({
    msg: `Il servizio con id ${serviceID} è stato rimosso con successo`,
  });
};

module.exports = {
  getAllServices,
  createService,
  getService,
  updateService,
  deleteService,
};
