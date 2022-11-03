const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  // default
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Qualcosa è andato storto, riprovare più tardi",
  };
  // mongodb, errore nella validazione dei campi
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  // mongodb, chiave duplicata
  if (err.code && err.code === 11000) {
    customError.msg = `Il valore ${Object.keys(
      err.keyValue
    )} è già registrato, scegliere un altro valore`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  // mongodb, oggetto non trovato
  if (err.name === "CastError") {
    customError.msg = `Nessun oggetto trovato con id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: err.message });
};

module.exports = errorHandlerMiddleware;
