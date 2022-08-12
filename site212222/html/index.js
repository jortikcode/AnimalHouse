// Global var
global.rootDir = __dirname;

// Setup
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cors = require('cors');
const connectDB = require(global.rootDir + '/scripts/mongo-db.js'); 

const app = express();

// Mongo
const mongoCredentials = {
	user: "site212222",
	pwd: "Ziu0reeh",
	site: "mongo_site212222"
}
connectDB.init(mongoCredentials);

app.use('/js'  , express.static(global.rootDir +'/public/js'));
app.use('/css' , express.static(global.rootDir +'/public/css'));
app.use('/data', express.static(global.rootDir +'/public/data'));
app.use('/docs', express.static(global.rootDir +'/public/html'));
app.use('/img' , express.static(global.rootDir +'/public/media'));
app.use(express.urlencoded({ extended: false })) 
app.use(cors())

// Engine
app.set('views', path.join(global.rootDir + '/views'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	res.render('main', {
		array: ['One', 'Two', 'Three', 'Four'],
		message: 'ciaooo mamma'
	 });
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.post('/login', (req, res) => {

});

app.get('/register', (req, res) => {
	res.render('register');
});

app.post('/register', (req, res) => {

});

// Active node server
app.listen(8000);