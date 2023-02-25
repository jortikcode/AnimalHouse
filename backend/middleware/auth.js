const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Admin = require("../models/admin");
const { createCustomError } = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

// Da aggiungere prima di ogni route che necessita di autentificazione
const authenticationMiddleware = async (req, res, next) => {
  // verico che il token sia presente
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw createCustomError("Token non presente", StatusCodes.UNAUTHORIZED);
  }
  // perchè sarà nel formato "Barer token"
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw createCustomError("Non autorizzato", StatusCodes.UNAUTHORIZED);
  }
  try {
    // prendo l'id dell'utente e verifico che sia presente
    let newToken = token.replace(/"/g, "");
    const decoded = jwt.verify(newToken, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      const admin = await Admin.findOne({ _id: decoded.id });
      if (!admin) {
        throw createCustomError("Utente non trovato", StatusCodes.NOT_FOUND);
      }
      req.isAdmin = true;
      return next();
    }
    //setto il campo userInfo e proseguo
    req.userInfo = user;
    next();
  } catch (error) {
    throw createCustomError("Non autorizzato", StatusCodes.UNAUTHORIZED);
  }
};

module.exports = { authenticationMiddleware };
