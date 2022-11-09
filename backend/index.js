/*
 *---------- GENERAL SETUP ----------
 */
global.baseDir = __dirname;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();

// gestore degli errori asincroni, per non usare il costrutto trycatch
require("express-async-errors");

app.use("/data", express.static(path.join(__dirname, "public", "data")));
app.use("/img", express.static(path.join(__dirname, "public", "media")));
app.use("/js", express.static(path.join(__dirname,"..", "back-office", "js")));
app.use("/bootstrap", express.static(path.join(__dirname,"..", "back-office", "bootstrap")));
app.use(express.static(path.join(__dirname, "./back-office")));
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "public", "")));
// middleware per usare i dati nel body delle richieste
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.enable("trust proxy");

// Routes
app.use("/back-office", require("./routes/back-office"));
app.use("/api/v1", require("./routes/apiRouter"));
app.use(notFound);
// Da usare sempre come ultimo
app.use(errorHandlerMiddleware);

/* 
// TODO: Resolve /login and / conflict between game and backoffice
app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
}); 
*/

/*
 *---------- SERVER ----------
 */
const port = 8000;

const start = async () => {
  try {
    // connectDB(process.env.DB_URL);
    connectDB("mongodb://site212222:Ziu0reeh@mongo_site212222?writeConcern=majority");
    app.listen(port, () => console.log(`app listening on port ${port}!`));
  } catch (error) {
    console.log(error);
  }
};

start();
