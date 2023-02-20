const User = require("../models/users");
const { createCustomError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const path = require("path");

const getAllUsers = async (req, res) => {
  const { name, surname, email, sort, fields } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (surname) {
    queryObject.surname = { $regex: surname, $options: "i" };
  }
  if (email) {
    queryObject.email = { $regex: email, $options: "i" };
  }

  let result = User.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("name");
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
  const users = await result;
  res.status(StatusCodes.OK).json(users);
};

const getUser = async (req, res) => {
  const { id: userID } = req.params;
  const user = await User.findOne({ _id: userID });
  if (!user) {
    throw createCustomError(
      `Non esiste nessun utente con id : ${userID}`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json(user);
};

const prepareUpdate = async (body, userID) => {
  const updateObj = {};
  const {
    name,
    surname,
    petName,
    petParticularSigns,
    petBirthYear,
    petAnimalType,
    imgName,
    punteggiDeiGiochi,
    clearPets,
  } = body;
  if (name) {
    updateObj.name = name;
  }
  if (surname) {
    updateObj.surname = surname;
  }
  // Inserimento dati animale
  if (petName || petParticularSigns || petBirthYear || petAnimalType) {
    updateObj.animaliPreferiti = [
      {
        name: petName,
        birthYear: petBirthYear,
        particularSigns: petParticularSigns,
        animalType: petAnimalType,
      },
    ];
  }
  if (imgName) {
    updateObj.imgName = imgName;
  }
  if (punteggiDeiGiochi) {
    updateObj.punteggiDeiGiochi = punteggiDeiGiochi;
  }

  if (clearPets) {
    const user = await User.findOne({ _id: userID });
    for (const animal of user.animaliPreferiti) {
      try {
        fs.unlink(
          path.join(global.baseDir, "public", "media", animal.imgName),
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
      } catch (e) {
        console.log(e);
      }
    }
    updateObj.animaliPreferiti = [];
  }
  return updateObj;
};

const updateUser = async (req, res) => {
  const { id: userID } = req.params;
  const updateObj = await prepareUpdate(req.body, userID);

  // Inserimento di un nuovo pet
  if (req.body.petImage){
    if (req.file?.filename)
      updateObj.animaliPreferiti[0].imgName = req.file.filename
    else
      updateObj.animaliPreferiti[0].imgName = "default_pet_image.jpg"
    const user = await User.findOne({ _id: userID })
    updateObj.animaliPreferiti = [ updateObj.animaliPreferiti[0] , ...user.animaliPreferiti ]
  }else if (req.file?.filename){
    // Inserimento nuova immagine del profilo di un utente
    updateObj.imgName = req.file.filename
  }

  const user = await User.findOneAndUpdate(
    { _id: userID },
    { $set: updateObj },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) {
    throw createCustomError(
      `Non esiste nessun utente con id : ${userID}`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json(user);
};

const deleteUser = async (req, res) => {
  if (req.userInfo._id == req.params.id || req.userInfo.isAdmin) {
    const { id: userID } = req.params;
    const user = await User.findOneAndDelete({ _id: userID });
    if (!user) {
      throw createCustomError(
        `Non esiste nessun utente con id : ${userID}`,
        StatusCodes.NOT_FOUND
      );
    }
    res
      .status(StatusCodes.OK)
      .json({ msg: `L'utente con id ${userID} è stato rimosso con successo` });
  } else {
    throw createCustomError(
      "Puoi eliminare solo il tuo account",
      StatusCodes.FORBIDDEN
    );
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
