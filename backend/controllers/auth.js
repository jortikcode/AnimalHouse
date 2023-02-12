const { createCustomError } = require("../errors/custom-error");
const User = require("../models/users");
const Admin = require("../models/admin");
const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");
const sendEmail = require("../scripts/sendEmail");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw createCustomError(
      "Fornire email e password",
      StatusCodes.BAD_REQUEST
    );
  }
  // verifico l'email
  const user = await User.findOne({ email: email });
  if (!user) {
    throw createCustomError("Credenziali non corrette", StatusCodes.NOT_FOUND);
  }
  // verifico la password
  const isCorrect = await user.matchPasswords(password);
  if (!isCorrect) {
    throw createCustomError("Credenziali non corrette", StatusCodes.NOT_FOUND);
  }
  const token = user.getSignedToken();
  res.status(StatusCodes.OK).json({ token: token, userInfo: user });
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw createCustomError(
      "Fornire email e password",
      StatusCodes.BAD_REQUEST
    );
  }
  // verifico l'email e che sia Admin
  const admin = await Admin.findOne({ email: email }).populate("location");
  if (!admin) {
    throw createCustomError("Credenziali non corrette", StatusCodes.NOT_FOUND);
  }
  // verifico la password
  const isCorrect = await admin.matchPasswords(password);
  if (!isCorrect) {
    throw createCustomError("Credenziali non corrette", StatusCodes.NOT_FOUND);
  }
  const token = admin.getSignedToken();
  res.status(StatusCodes.OK).json({ token: token, locationInfo: admin.location });
};

const registerAdmin = async (req, res) => {
  const admin = await Admin.create({ ...req.body });
  const token = admin.getSignedToken();
  res.status(StatusCodes.CREATED).json({ token: token, adminInfo: admin });
};

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.getSignedToken();
  res.status(StatusCodes.CREATED).json({ token: token, userInfo: user });
};

const forgotPassword = async (req, res) => {
  // verifico che esista un utente con questa email
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw createCustomError("Credenziali non corrette", StatusCodes.NOT_FOUND);
  }
  // genero un token
  const resetToken = user.getResetPasswordToken();
  // salvo il token
  await user.save();
  // creo l'url da mandare
  const resetURL = `${process.env.SITE_URL}/resetPassword/${resetToken}`;
  // creo il messaggio da mandare
  const msg = `<h1>Ciao ${user.name}</h1>
  <p>Per scegliere una nuova password clicca questo link</p>
  <a href=${resetURL} clicktraking=off>${resetURL}</a>`;
  // mando la mail
  try {
    sendEmail({
      to: user.email,
      subject: "Ripristino password",
      text: msg,
    });
    res.status(StatusCodes.OK).json({ msg: "Email inviata" });
  } catch (error) {
    // se l'invio è fallito annullo il token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.save();
    throw createCustomError(
      "L'email non è stata inviata, riprovare",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const resetPassword = async (req, res) => {
  // creo il digest del token per poi confrontarlo con quello salvato sul db
  const resetToken = crypto.update(req.params.token).digest("hex");
  // controllo che sia presente sul db e che non sia scaduto
  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    throw createCustomError("Token scaduto", StatusCodes.NOT_FOUND);
  }
  // cambio la password e annullo il token
  user.password = req.body.password;
  await user.save();
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  res.status(StatusCodes.OK).json({ msg: "Password ripristina con successo" });
};

module.exports = {
  login,
  register,
  loginAdmin,
  registerAdmin,
  forgotPassword,
  resetPassword,
};
