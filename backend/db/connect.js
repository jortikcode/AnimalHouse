const mongoose = require("mongoose");

// per il collegamento a mongoDB
const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: global.dbName,
  });
};

module.exports = connectDB;
