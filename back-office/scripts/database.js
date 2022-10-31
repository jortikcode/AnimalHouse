const mongoose = require('mongoose');

const conn = global.mongouri;

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: global.dbName
});

const UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    indirizzo: String,
    citta: String,
    cap: String,
    dtnascita: String,
    genere: String,
    admin: Boolean,
    animaliPreferiti: [String],
    punteggiDeiGiochi: [Object]
});

const User = connection.model('users', UserSchema);

module.exports = connection;