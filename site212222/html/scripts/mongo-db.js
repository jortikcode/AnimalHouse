const { MongoClient } = require("mongodb");
const fs = require('fs').promises ;
const template = require(global.rootDir + '/scripts/tpl.js') ;

exports.init = async function(credentials) {
	const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}?writeConcern=majority`;
	try {
		const conn = new MongoClient(mongouri);
		await conn.connect();
		console.log(`MongoDB Connected: ${conn.connection.host}`)
	} catch (err) {
		console.error(err)
        process.exit(1)
	}
}
