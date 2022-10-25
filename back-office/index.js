/*
 *---------- GLOBAL ----------
 */

require('dotenv').config();

global.rootDir = __dirname;

global.mongoCredentials = {
	user: process.env.DB_USER,
	pwd: process.env.DB_PSW,
	site: process.env.DB_SITE
}

global.dbName = process.env.DB_NAME

//!!!USARE QUESTO URI PER LE MACCHINE DEL DIPARTIMENTO
//global.mongouri = `mongodb://${global.mongoCredentials.user}:${global.mongoCredentials.pwd}@${global.mongoCredentials.site}?writeConcern=majority`;
global.mongouri = `mongodb+srv://site212222:${global.mongoCredentials.pwd}@users.ctus6cf.mongodb.net/Animal_House?retryWrites=true&w=majority`;

/*
 *---------- GENERAL SETUP ----------
 */

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { engine } = require('express-handlebars');
const path = require("path");

const login_routes = require(global.rootDir + '/routes/login.js');
const admin_routes = require(global.rootDir + '/routes/admin.js');

const app = express();

app.use('/js'  , express.static(global.rootDir +'/public/js'));
app.use('/css' , express.static(global.rootDir +'/public/css'));
app.use('/data', express.static(global.rootDir +'/public/data'));
app.use('/docs', express.static(global.rootDir +'/public/html'));
app.use('/img' , express.static(global.rootDir +'/public/media'));
app.use('/views' , express.static(global.rootDir +'/public/views'));
app.use('/tpl' , express.static(global.rootDir +'/tpl'));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.use(express.json());

app.enable('trust proxy');

/*
 *---------- HANDLEBARS ----------
 */

app.engine('hbs', engine({
	extname: 'hbs',
	defaultLayout: 'main',
	helpers: {
		inc(value) { return parseInt(value) + 1; }
	}
}));
app.set('view engine', 'hbs');
app.set('views', global.rootDir +'/public/views/');

/*
 *---------- SESSION SETUP ----------
 */

const sessionStore = new MongoStore({ mongoUrl: global.mongouri, dbName: global.dbName });

app.use(session({
	secret: 'secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 100 * 60 * 60 * 24 // 1 day
	}
}));

/*
 *---------- PASSPORT AUTHENTICATION ----------
 */

require(global.rootDir + '/scripts/passport-config.js'); 
app.use(passport.initialize());
app.use(passport.session());

/*
 *---------- ROUTES ----------
 */

 app.use('/', login_routes);
 app.use('/admin', admin_routes);

/* 
// TODO: Resolve /login and / conflict between game and backoffice
app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
}); 
*/
 

/*
 *---------- SERVER ----------
 */

app.listen(8000);