/** Database connection for messagely. */

const { Client } = require("pg");
const { data } = require("./config");

const client = new Client(data);

client.connect();

module.exports = client;
