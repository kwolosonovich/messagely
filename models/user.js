/** User class for message.ly */

const db = require("../db");
const bcrypt = require("bcrypt");
const ExpressError = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config");

/** User of the site. */

class User {
  
  /** register new user */
  static async register({ username, password, first_name, last_name, phone }) {
    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const result = await db.query(
      `INSERT INTO users (
              username,
              password,
              first_name,
              last_name,
              phone,
              join_at,
              last_login_at)
            VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)
            RETURNING username, password, first_name, last_name, phone`,
      [username, hashedPassword, first_name, last_name, phone]
    );
    return result.rows[0];
  }

  /** Authenticate: is this username/password valid? Returns boolean. */
  static async authenticate(username, password) {
    let result = await db.query(
      `SELECT password FROM users 
      WHERE username=$1`,
      [username]
    );
    let inputPassword = result.rows[0].password;
    return user && (await bcrypt.compare(password, inputPassword));
  }

  /** Update last_login_at for user */
  static async updateLoginTimestamp(username) {
    let result = await db.query(
      `UPDATE users
        SET last_login_at = current_timestamp
        WHERE username = $1`,
      [username]
    );
    console.log(result.statusCode);
    return result;
  }

  /** All: basic info on all users */
  static async all() {
    let result = await db.query(
      `SELECT username,
             first_name,
             last_name,
             phone
             FROM users`
    );
    return result;
  }

  /** Get: get user by username */
  static async get(username) {
    let result = db.query(
      `SELECT username, first_name, last_name, phone
        FROM users
        WHERE username = $1`,
      [username]
    );
    if (!result.rows[0]) {
      throw new ExpressError(`No such user: ${username}`, 404);
    }
    return result.rows[0];
  }

  /** Return messages from this user  */
  static async messagesFrom(username) {
    let result = await db.query(
      `SELECT username, first_name, last_name, phone
      FROM users
      WHERE username=$1
      JOIN messages
      ON to_username = username`,
      [username]
    );
    return result.rows[0];
  }

  /** Return messages to this user.*/
  static async messagesTo(username) {
    let result = await db.query(
      `SELECT username, first_name, last_name, phone
      FROM users
      WHERE username=$1
      JOIN messages
      ON to_username = username`,
      [username]
    );
    return result.rows[0];
  }
}


module.exports = User;