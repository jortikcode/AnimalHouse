const { MongoClient } = require("mongodb");
const { exit } = require("process");
const fs = require('fs').promises ;
const template = require(__dirname + '/scripts/tpl.js') ;

const mongo = new MongoClient(global.mongouri);

exports.create = async function(collection, data) {
	let debug = []
	try {
		await mongo.connect();
		debug.push("... managed to connect to MongoDB.")

		debug.push(`Trying to add ${data.length} new records... `)
		let added = await mongo.db(global.dbname)
					.collection(collection)
		 			.insertOne(data);
		debug.push(`... ${added?.insertedCount || 0} records added.`)

		await mongo.close();
		debug.push("Managed to close connection to MongoDB.")

	} catch (e) {
		console.error(e);
		exit(1);
	}
}


exports.search = async function(q, collection, fieldname) {
	let query =  {}
	let debug = []
	let data = {query: q[fieldname], result: null}
	try {
		await mongo.connect();
		debug.push("... managed to connect to MongoDB.")

		debug.push(`Trying to query MongoDB with query '${q[fieldname]}'... `)
		let result = []
		query[fieldname] = { $regex: q[fieldname], $options: 'i' }
		await mongo.db(global.dbname)
					.collection(collection)
					.find(query)
					.forEach( (r) => { 
						result.push(r) 
					} );
		debug.push(`... managed to query MongoDB. Found ${result.length} results.`)

		data.result = result
		await mongo.close();
		debug.push("Managed to close connection to MongoDB.")

		data.debug = debug
		return result[0];
	} catch (e) {
		console.error(e);
		exit(1);
	}
}

exports.update_psw = async function(val, new_val) {
	const collection = 'users';
	let debug = []
	try {
		await mongo.connect();
		debug.push("... managed to connect to MongoDB.")

		await mongo.db(global.dbname)
					.collection(collection)
					.updateOne(
						{ email: val },
						{ $set: { password: new_val }
					})
		debug.push(`... uldated`)

		await mongo.close();
		debug.push("Managed to close connection to MongoDB.")

	} catch (e) {
		console.error(e);
		exit(1);
	}
}

exports.delete = async function(collection, val) {
	let debug = []
	try {	
		await mongo.connect();
		debug.push("... managed to connect to MongoDB.")

		await mongo.db(global.dbname)
					.collection(collection)
					.deleteOne(
						{ email: val }
					)
		debug.push(`... dated`)

		await mongo.close();
		debug.push("Managed to close connection to MongoDB.")

	} catch (e) {
		console.error(e);
		exit(1);
	}
}

/* Untested */
// https://stackoverflow.com/questions/39599063/check-if-mongodb-is-connected/39602781
exports.isConnected = async function() {
	let client = await MongoClient.connect(global.mongouri) ;
	return !!client && !!client.topology && client.topology.isConnected()
}
