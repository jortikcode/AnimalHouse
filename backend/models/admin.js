const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const path = require("path");

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Un admin deve avere un email"],
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Un utente deve avere una mail valida",
    ],
  },
  password: {
    type: String,
    required: [true, "Un admin deve avere una password"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "La password deve contenere una lettera maiuscola, una minuscola, un numero, un carattere non alfanumerico e deve essere lunga almeno otto caratteri",
    ],
  },
  location: {
    type: mongoose.Types.ObjectId,
    ref: "Location",
    required: [true, "La sede deve essere specificata"],
  },
});

// pre serve a eseguire un middleware prima di un dato evento.
AdminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  // aggiungiamo il sale alla password
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// verifica se le password combaciano
AdminSchema.methods.matchPasswords = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

// genero un nuovo jwt
AdminSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

module.exports = mongoose.model("Admin", AdminSchema);
