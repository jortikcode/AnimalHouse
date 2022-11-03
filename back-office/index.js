/*
 *---------- GENERAL SETUP ----------
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { engine } = require("express-handlebars");
const path = require("path");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();

// gestore degli errori asincroni, per non usare il costrutto trycatch
require("express-async-errors");

app.use("/css", express.static(path.join(__dirname, "public", "css")));
app.use("/data", express.static(path.join(__dirname, "public", "data")));
app.use("/img", express.static(path.join(__dirname, "public", "media")));
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "public", "")));
// middleware per usare i dati nel body delle richieste
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.enable("trust proxy");

/*
 *---------- HANDLEBARS ----------
 */

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    helpers: {
      inc(value) {
        return parseInt(value) + 1;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

/*
 *---------- SESSION SETUP ----------
 */

const sessionStore = new MongoStore({
  mongoUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 100 * 60 * 60 * 24, // 1 day
    },
  })
);

/*
 *---------- ROUTES ----------
 */

app.use("/api/v1", require("./routes/apiRouter"));
app.use("/admin", require("./routes/adminRouter"));
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
    connectDB(process.env.DB_URL);
    app.listen(port, () => console.log(`app listening on port ${port}!`));
  } catch (error) {
    console.log(error);
  }
};

start();
