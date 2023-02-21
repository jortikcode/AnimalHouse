const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const path = require("path");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Un utente deve avere un nome"],
  },
  surname: {
    type: String,
    required: [true, "Un utente deve avere un cognome"],
  },
  email: {
    type: String,
    required: [true, "Un utente deve avere un email"],
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Un utente deve avere una mail valida",
    ],
  },
  password: {
    type: String,
    required: [true, "Un utente deve avere una password"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "La password deve contenere una lettera maiuscola, una minuscola, un numero, un carattere non alfanumerico e deve essere lunga almeno otto caratteri",
    ],
  },
  address: {
    city: String,
    via: String,
    postal_code: Number,
  },
  birth: {
    type: Date,
    required: [true, "Un utente deve avere una data di nascita"],
  },
  gender: {
    type: String,
    required: [true, "Un utente deve avere un genere"],
  },
  animaliPreferiti: [
    {
      name: String,
      imgName: String,
      birthYear: String,
      particularSigns: String,
      animalType: String,
    },
  ],
  punteggiDeiGiochi: [
    {
      game: String,
      score: Number,
    },
  ],
  imgName: {
    type: String,
    default: "favicon.jpg",
  },
  isVip: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// pre serve a eseguire un middleware prima di un dato evento.
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  // aggiungiamo il sale alla password
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// verifica se le password combaciano
UserSchema.methods.matchPasswords = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

// genero un nuovo jwt
UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.pre("findOneAndUpdate", async function (next) {
  // in questo caso si modifica l'azione non il documento
  if (!this.getUpdate().$set.password) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  //aggiungiamo il sale alla password
  this.getUpdate().$set.password = await bcrypt.hash(this.getUpdate().$set.password, salt);
  return next();
});

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // setta il campo resetPasswordToken di questo utente
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // 10 minuti
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  // ritorniamo la versione non hashata
  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
