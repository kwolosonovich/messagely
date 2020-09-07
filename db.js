/** Database connection for messagely. */


const { Client } = require("pg");
const { data } = require("./config");

// const client = new Client(DB_URI);

// client.connect();

// let db = new Client({
//   database: data,
// });

// db.connect();


// module.exports = {db};

const client = new Client(data);

client.connect();

module.exports = client;
