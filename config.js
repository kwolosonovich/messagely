/** Common config for message.ly */

// read .env files and make environmental variables

// require("dotenv").config();

// const DB_URI = (process.env.NODE_ENV === "test")
//   ? "postgresql:///messagely_test"
//   : "postgresql:///messagely";

require("dotenv").config();

let data;

if (process.env.NODE_ENV === "test") {
  data = "messagely_test";
} else {
  data = "messagely";
}

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const BCRYPT_WORK_FACTOR = 12;


module.exports = {
  data,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
};