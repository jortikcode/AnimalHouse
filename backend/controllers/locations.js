const Location = require("../models/locations");
const { createCustomError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const getAllLocations = async (req, res) => {
  const {sort} = req.query;

  let result = Location.find();
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("city");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  // calcolo i risultati da saltare in base alla pagina che mi trovo
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const posts = await result;
  res.status(StatusCodes.OK).json(posts);
};

const createLocation = async (req, res) => {
  const location = await Location.create(req.body);
  res.status(201).json({ location });
};

const getLocationByID = async (req, res) => {
  const { id: locationID } = req.params;
  const location = await Post.findOne({ _id: locationID });
  if (!location) {
    throw createCustomError(
      `Non esiste nassuna sede con id : ${locationID}`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json({ location });
};

const getLocationByCity = async (req, res) => {
    const { city: locationCity } = req.params;
    const location = await Post.findOne({ city: locationCity });
    if (!location) {
      throw createCustomError(
        `Non esiste nassuna sede nella città : ${locationCity}`,
        StatusCodes.NOT_FOUND
      );
    }
    res.status(StatusCodes.OK).json({ location });
  };

const updateLocation = async (req, res) => {
  const { id: locationID } = req.params;
  const location = await Location.findOneAndUpdate(
    { _id: locationID },
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!location) {
    throw createCustomError(
      `Non esiste nessuna sede con id : ${locationID}`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json({ id: locationID, data: req.body });
};

const deleteLocation = async (req, res) => {
  const { id: locationID } = req.params;
  const location = await Location.findOneAndDelete({ _id: locationID });
  if (!location) {
    throw createCustomError(
      `Non esiste nessuna sede con id : ${locationID}`,
      StatusCodes.NOT_FOUND
    );
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: `La sede con id ${postID} è stata rimossa con successo` });
};

module.exports = {
  getAllLocations,
  createLocation,
  getLocationByID,
  getLocationByCity,
  updateLocation,
  deleteLocation,
};
