/** Database connection for messagely. */


const { Client } = require("pg");
const { data } = require("./config");

// const client = new Client(DB_URI);

// client.connect();

let db = new Client({
  database: data,
});

db.connect();


module.exports = {client, db};
