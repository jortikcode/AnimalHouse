const Service = require("../models/services");
const { createCustomError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const path = require("path");

const getAllServices = async (req, res) => {
  const { location, isVip } = req.query;
  const queryObject = {};
  if (location) {
    queryObject.location = location;
  }
  if (isVip == "false") {
    queryObject.isVip = false;
  }

  let services = Service.find(queryObject).populate("location");
  if (getServices) {
    services = services.distinct("serviceName");
  }
  services = await services.exec();
  res.status(StatusCodes.OK).json(services);
};

const createService = async (req, res) => {
  const { serviceName, description, price, location, isVip } = req.body;
  let imgName = "default_product_image.jpg";
  if (req.file?.filename) {
    imgName = req.file.filename;
  }
  const service = await Service.create({
    serviceName,
    description,
    price: Number(price),
    isVip: Boolean(isVip == "true"),
    imgName,
    location,
  });
  res.status(StatusCodes.CREATED).json(service);
};

const getService = async (req, res) => {
  const { id: serviceID } = req.params;
  const service = await Service.findOne({ _id: serviceID }).populate("location");
  if (!service) {
    throw createCustomError(`Non esiste nessun servizio con id : ${serviceID}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json(service);
};

const updateService = async (req, res) => {
  const { id: serviceID } = req.params;
  const { serviceName, description, price, isVip } = req.body;
  const updateObj = {};
  if (serviceName) {
    updateObj.serviceName = serviceName;
  }
  if (description) {
    updateObj.description = description;
  }
  if (price) {
    updateObj.price = price;
  }
  if (isVip) {
    updateObj.isVip = Boolean(isVip == "true");
  }
  if (req.file?.filename) {
    updateObj.imgName = req.file.filename;
    /* Cancello l'immagine precente */
    const service = await Service.findOne({ _id: serviceID });
    if (!service) {
      throw createCustomError(`Non esiste nessun prodotto con id : ${serviceID}`, StatusCodes.NOT_FOUND);
    }
    if (service.imgName != "default_service_image.jpg") {
      fs.unlink(path.join(global.baseDir, "public", "media", service.imgName), (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
  const service = await Service.findOneAndUpdate(
    { _id: serviceID },
    { $set: updateObj },
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
  const service = await Service.findOne({ _id: serviceID });
  if (!service) {
    throw createCustomError(`Non esiste nessun servizio con id : ${serviceID}`, StatusCodes.NOT_FOUND);
  }
  if (service.imgName != "default_service_image.jpg") {
    fs.unlink(path.join(global.baseDir, "public", "media", service.imgName), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  await Service.deleteOne({ _id: serviceID });
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
